const mongoose = require("mongoose");
const User = require("../models/user.models");
const ApiResponse = require("../utils/ApiResponse");
const ExpressError = require("../utils/ExpressError");
const uploadOnCloudinary = require("../utils/cloudinary");
const pagination = require("../utils/pagination");

const generatAccessAndRefresshTokens = async (userId) => {
  const user = await User.findById(userId);

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const validateRegisterUser = async (req, res, next) => {
  res.json({ verified: true });
};

const registerUser = async (req, res, next) => {
  const { username, email, password, name, bio } = req.body;

  let profilePicture =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png";
  if (req.file) {
    const response = await uploadOnCloudinary(req.file.path);
    profilePicture = response.url;
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser)
    return next(
      new ExpressError(409, "User with email/username already exists.")
    );

  let user = await User.create({
    username,
    email,
    password,
    name,
    bio,
    profilePicture,
  });

  const { accessToken, refreshToken } = await generatAccessAndRefresshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        201,
        { loggedInUser, accessToken, refreshToken },
        "Signup & Loggedin successfully."
      )
    );
};

const profSetUp = async (req, res, next) => {
  let { name, bio } = req.body;

  if (name.trim().length === 0 || name.trim().length === 0)
    return next(new ExpressError(401, "Both fields are required"));

  let user = await User.findByIdAndUpdate(req.user._id, {
    name,
    bio,
    profilePicture,
  });

  res
    .status(200)
    .json(new ApiResponse(200, user, "Profile setup successfully."));
};

const loginUser = async (req, res, next) => {
  const { email, username, password } = req.body;

  if (!username) {
    if (!email) throw new ExpressError(400, "username or email is required");
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) return next(new ExpressError(404, "User does not exists."));

  const isValidPassword = await user.isPasswordCorrect(password);

  if (!isValidPassword)
    return next(new ExpressError(401, "Invalid user credentials"));

  const { accessToken, refreshToken } = await generatAccessAndRefresshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { loggedInUser, accessToken, refreshToken },
        "Loggedin successfully."
      )
    );
};

const logoutUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, {
    $set: { refreshToken: undefined },
  });

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ message: "LoggedOut user successfully." });
};

const updateUser = async (req, res, next) => {
  if (req.file) {
    const response = await uploadOnCloudinary(req.file.path);
    req.body.profilePicture = response.url;
  }

  let user = await User.findOne({ username: req.params.username });
  if (!user._id.equals(req.user._id)) {
    next(new ExpressError(403, "You cannot edit others profile."));
  }
  let loggedInUser = await User.findByIdAndUpdate(req.user._id, req.body);
  res
    .status(200)
    .json(
      new ApiResponse(200, { loggedInUser }, "Profile updated successfully.")
    );
};

const searchUsers = async (req, res, next) => {
  const { username } = req.query;

  try {
    let users = await User.find({
      username: { $regex: username, $options: "i" },
    });

    users = await Promise.all(
      users.map(async (user) => {
        return await User.aggregate([
          {
            $match: { username: user.username },
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
              followersCount: {
                $size: "$followers",
              },
            },
          },
          {
            $project: {
              username: 1,
              name: 1,
              followersCount: 1,
              profilePicture: 1,
            },
          },
        ]);
      })
    );

    users = users.map((user) => user[0]);

    res.json(new ApiResponse(200, users));
  } catch (error) {
    console.error("Error searching for users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUser = async (req, res, next) => {
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
      },
    },
    {
      $lookup: {
        from: "follows",
        localField: "_id",
        foreignField: "follower",
        as: "followings",
      },
    },
    {
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "owner",
        as: "posts",
      },
    },
    {
      $addFields: {
        followersCount: {
          $size: "$followers",
        },
        followingsCount: {
          $size: "$followings",
        },
        postsCount: {
          $size: "$posts",
        },
        isFollowing: {
          $cond: {
            if: { $in: [req.user._id, "$followers.follower"] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        username: 1,
        name: 1,
        bio: 1,
        followingsCount: 1,
        followersCount: 1,
        profilePicture: 1,
        posts: 1,
        isFollowing: 1,
        postsCount: 1,
      },
    },
  ]);

  user
    ? res.json(new ApiResponse(201, { user: user[0] }))
    : next(new ExpressError(404, "User Not Found"));
};

const getUserPosts = async (req, res, next) => {
  const { username } = req.params;
  let userPosts = await User.aggregate([
    {
      $match: { username },
    },
    {
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "owner",
        as: "posts",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  $project: {
                    username: 1,
                    profilePicture: 1,
                  },
                },
              ],
            },
          },
          {
            $lookup: {
              from: "likes",
              localField: "_id",
              foreignField: "postId",
              as: "likes",
            },
          },
          {
            $lookup: {
              from: "comments",
              localField: "_id",
              foreignField: "postId",
              as: "comments",
            },
          },
          {
            $addFields: {
              owner: { $first: "$owner" },
              likesCount: { $size: "$likes" },
              commentCount: { $size: "$comments" },
              isLiked: {
                $cond: {
                  if: {
                    $in: [
                      new mongoose.Types.ObjectId(req.user._id),
                      "$likes.userId",
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
              likes: 0,
              comments: 0,
            },
          },
        ],
      },
    },
    {
      $project: {
        posts: 1,
      },
    },
  ]);

  userPosts = userPosts[0].posts;

  let page = req.query.page || 1;
  let limit = req.query.limit || 12;

  let { startIndex, endIndex, isNext, isPrevious } = pagination(
    page,
    limit,
    userPosts
  );

  userPosts = userPosts.reverse().slice(startIndex, endIndex);

  res.json(new ApiResponse(200, { page, userPosts, isNext, isPrevious }));
};

const getAllLikedPost = async (req, res, next) => {
  let likedPosts = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "userId",
        as: "likedPosts",
        pipeline: [
          {
            $lookup: {
              from: "posts",
              localField: "postId",
              foreignField: "_id",
              as: "post",
              pipeline: [
                {
                  $project: {
                    image: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              post: {
                $first: "$post",
              },
            },
          },
          {
            $project: {
              post: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        likedPosts: 1,
      },
    },
  ]);

  let page = req.query.page || 1;
  let limit = req.query.limit || 5;
  let startIndex = (page - 1) * limit;
  let endIndex = page * limit;

  let isNext;
  let isPrevious;

  if (endIndex < likedPosts.length) {
    isNext = true;
  } else {
    isNext = false;
  }

  if (startIndex > 0) {
    isPrevious = true;
  } else {
    isPrevious = false;
  }

  likedPosts = likedPosts.slice(startIndex, endIndex);

  res.json(new ApiResponse(200, { page, isNext, isPrevious, likedPosts }));
};

module.exports = {
  validateRegisterUser,
  registerUser,
  profSetUp,
  loginUser,
  logoutUser,
  searchUsers,
  updateUser,
  getUser,
  getUserPosts,
  getAllLikedPost,
};
