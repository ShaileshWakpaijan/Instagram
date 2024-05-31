const mongoose = require("mongoose");
const User = require("../models/user.models");
const ApiResponse = require("../utils/ApiResponse");
const ExpressError = require("../utils/ExpressError");
const {
  uploadOnCloudinary,
  deleteOnCloudinary,
} = require("../utils/cloudinary");
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
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return next(
      new ExpressError(409, "User with given email is already exists.")
    );
  res.json({ verified: true });
};

const registerUser = async (req, res, next) => {
  const { username, email, password, name, bio } = req.body;

  let profilePicture;
  if (req.file) {
    const response = await uploadOnCloudinary(req.file.path);
    profilePicture = response.url;
  }

  if (!name) return next(new ExpressError(400, "Name should not be empty."));

  if (!username)
    return next(new ExpressError(400, "Username should not be empty."));

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
    sameSite: "None",
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

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    if (!email) throw new ExpressError(400, "username or email is required");
  }

  const user = await User.findOne({
    $or: [{ email: username }, { username }],
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
    sameSite: "None",
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
    sameSite: "None",
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ message: "LoggedOut user successfully." });
};

const updateUser = async (req, res, next) => {
  if (!req.body.username)
    return next(new ExpressError(400, "Username should not be empty."));

  let user = await User.findOne({ username: req.params.username });
  if (!user._id.equals(req.user._id)) {
    next(new ExpressError(403, "You cannot edit others profile."));
  }

  if (req.body.username !== req.params.username) {
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      next(new ExpressError(409, "Username already exists."));
    }
  }

  if (req.file) {
    const response = await uploadOnCloudinary(req.file.path);
    req.body.profilePicture = response.url;
    if (user.profilePicture) {
      let imageArr = user.profilePicture?.split("/");
      await deleteOnCloudinary(imageArr[imageArr.length - 1].split(".")[0]);
    }
  }

  let loggedInUser = await User.findByIdAndUpdate(
    req.user._id,
    req.body
  ).select("-password -refreshToken");

  res
    .status(200)
    .json(
      new ApiResponse(200, { loggedInUser }, "Profile updated successfully.")
    );
};

const deleteUser = async (req, res, next) => {
  console.log("working");
  if (req.params.username !== req.user.username) {
    return next(new ExpressError(403, "You can't delete others account."));
  }
  let user = req.user;
  const isValidPassword = await user.isPasswordCorrect(req.body.password);

  if (!isValidPassword) return next(new ExpressError(401, "Wrong password."));

  user = await User.findOneAndDelete({ username: user.username });

  if (!res) {
    return next(new ExpressError(500, "Internal Server Error"));
  }

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ message: "Account deleted successfully." });
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

    let page = req.query.page || 1;
    let limit = req.query.limit || 18;

    let { startIndex, endIndex, isNext, isPrevious } = pagination(
      page,
      limit,
      users
    );

    users = users.reverse().slice(startIndex, endIndex);

    res.json(new ApiResponse(200, { page, users, isNext, isPrevious }));
  } catch (error) {
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
              from: "saves",
              localField: "_id",
              foreignField: "postId",
              as: "saves",
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
              isSaved: {
                $cond: {
                  if: {
                    $in: [
                      new mongoose.Types.ObjectId(req.user._id),
                      "$saves.userId",
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

  likedPosts = likedPosts[0].likedPosts;

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

const getAllSavedPost = async (req, res, next) => {
  let savedPosts = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "saves",
        localField: "_id",
        foreignField: "userId",
        as: "savedPosts",
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
        savedPosts: 1,
      },
    },
  ]);

  savedPosts = savedPosts[0].savedPosts;

  let page = req.query.page || 1;
  let limit = req.query.limit || 5;
  let startIndex = (page - 1) * limit;
  let endIndex = page * limit;

  let isNext;
  let isPrevious;

  if (endIndex < savedPosts.length) {
    isNext = true;
  } else {
    isNext = false;
  }

  if (startIndex > 0) {
    isPrevious = true;
  } else {
    isPrevious = false;
  }

  savedPosts = savedPosts.slice(startIndex, endIndex);

  res.json(new ApiResponse(200, { page, isNext, isPrevious, savedPosts }));
};

module.exports = {
  validateRegisterUser,
  registerUser,
  loginUser,
  logoutUser,
  searchUsers,
  updateUser,
  getUser,
  getUserPosts,
  getAllLikedPost,
  getAllSavedPost,
  deleteUser,
};
