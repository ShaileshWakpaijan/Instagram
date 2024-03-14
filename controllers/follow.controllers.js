const User = require("../models/user.models");
const ApiResponse = require("../utils/ApiResponse");
const ExpressError = require("../utils/ExpressError");
const mongoose = require("mongoose");
const Follow = require("../models/follow.model");
const pagination = require("../utils/pagination")

const checkIsFollowing = async (req, res, next) => {
  let { username } = req.params;
  let isFollowing = await User.aggregate([
    {
      $match: { username },
    },
    {
      $lookup: {
        from: "follows",
        localField: "_id",
        foreignField: "following",
        as: "followers",
      },
    },
    {
      $addFields: {
        isFollowing: {
          $cond: {
            if: {
              $in: [
                new mongoose.Types.ObjectId(req.user._id),
                "$followers.follower",
              ],
            },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        isFollowing: 1,
      },
    },
  ]);
  res.json(new ApiResponse(200, isFollowing[0]));
};

const followUser = async (req, res, next) => {
  const { username } = req.params;
  const userToFollow = await User.findOne({ username });
  const currentUser = await User.findById(req.user._id);

  if (!userToFollow || !currentUser) {
    return next(new ExpressError(404, "User does not exist"));
  }
  if (userToFollow._id.equals(currentUser._id)) {
    return next(new ExpressError(400, "You cannot follow/unfollow yourself"));
  }

  const isAlreadyFollowing = await Follow.findOne({
    $and: [{ following: userToFollow }, { follower: currentUser }],
  });

  if (isAlreadyFollowing) {
    return next(new ExpressError(409, "Already following user"));
  }

  await Follow.create({
    following: userToFollow,
    follower: currentUser,
  });

  res.status(200).json(new ApiResponse(200, "Followed successfully."));
};

const unfollowUser = async (req, res, next) => {
  const { username } = req.params;
  const userToUnFollow = await User.findOne({ username });
  const currentUser = await User.findById(req.user._id);

  if (!userToUnFollow || !currentUser) {
    return next(new ExpressError(404, "User does not exist"));
  }

  if (userToUnFollow._id.equals(currentUser._id)) {
    return next(new ExpressError(400, "You cannot follow/unfollow yourself"));
  }

  let followDocument = await Follow.findOne({
    following: userToUnFollow,
    follower: currentUser,
  });

  if (!followDocument) {
    return next(new ExpressError(409, "Already not following user"));
  }

  await Follow.findByIdAndDelete(followDocument._id);

  res.status(200).json(new ApiResponse(200, "Unfollowed successfully."));
};

const userFollowers = async (req, res, next) => {
  const { username } = req.params;

  let user = await User.aggregate([
    {
      $match: { username },
    },
    {
      $lookup: {
        from: "follows",
        localField: "_id",
        foreignField: "following",
        as: "followers",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "follower",
              foreignField: "_id",
              as: "follower",
              pipeline: [
                {
                  $project: {
                    username: 1,
                    name: 1,
                    profilePicture: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              followers: {
                $first: "$follower",
              },
            },
          },
          {
            $project: {
              followers: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        followers: 1,
      },
    },
  ]);

  user = user[0].followers;

  let page = req.query.page || 1;
  let limit = req.query.limit || 12;

  let { startIndex, endIndex, isNext, isPrevious } = pagination(
    page,
    limit,
    user
  );

  user = user.reverse().slice(startIndex, endIndex);
  res.json(new ApiResponse(200, { page, user, isNext, isPrevious }));
};

const userFollowings = async (req, res, next) => {
  const { username } = req.params;

  let user = await User.aggregate([
    {
      $match: { username },
    },
    {
      $lookup: {
        from: "follows",
        localField: "_id",
        foreignField: "follower",
        as: "followings",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "following",
              foreignField: "_id",
              as: "following",
              pipeline: [
                {
                  $lookup: {
                    from: "follows",
                    localField: "_id",
                    foreignField: "following",
                    as: "followers",
                  },
                },
                {
                  $project: {
                    username: 1,
                    name: 1,
                    profilePicture: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              following: {
                $first: "$following",
              },
            },
          },
          {
            $project: {
              following: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        followings: 1,
        isFollowing: 1,
      },
    },
  ]);

  user = user[0].followings;

  let page = req.query.page || 1;
  let limit = req.query.limit || 12;

  let { startIndex, endIndex, isNext, isPrevious } = pagination(
    page,
    limit,
    user
  );

  user = user.reverse().slice(startIndex, endIndex);
  res.json(new ApiResponse(200, { page, user, isNext, isPrevious }));
};

module.exports = {
  checkIsFollowing,
  followUser,
  unfollowUser,
  userFollowers,
  userFollowings,
};
