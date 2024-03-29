const mongoose = require("mongoose");
const Post = require("../models/post.models");
const Follow = require("../models/follow.model");
const ApiResponse = require("../utils/ApiResponse");
const ExpressError = require("../utils/ExpressError");
const uploadOnCloudinary = require("../utils/cloudinary");
const pagination = require("../utils/pagination");

const getAllFolloedPost = async (req, res, next) => {
  let allFollowedPosts = await Follow.aggregate([
    {
      $match: {
        follower: new mongoose.Types.ObjectId("65e6e92f9faa7ca5b28c5385"),
      },
    },
    {
      $group: {
        _id: null,
        followedUsers: {
          $addToSet: "$following",
        },
      },
    },
    {
      $lookup: {
        from: "posts",
        localField: "followedUsers",
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
            $addFields: {
              owner: {
                $first: "$owner",
              },
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

  if (!allFollowedPosts[0]) return res.redirect("/api/v1/post");

  allFollowedPosts = allFollowedPosts[0].posts;

  let page = req.query.page || 1;
  let limit = req.query.limit || 1;

  let { startIndex, endIndex, isNext, isPrevious } = pagination(
    page,
    limit,
    allFollowedPosts
  );

  allFollowedPosts = allFollowedPosts.reverse().slice(startIndex, endIndex);
  res.json(
    new ApiResponse(200, { page, allFollowedPosts, isNext, isPrevious })
  );
};

const getAllPost = async (req, res) => {
  let allPost = await Post.aggregate([
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
      $addFields: {
        owner: {
          $first: "$owner",
        },
      },
    },
  ]);

  let page = req.query.page || 1;
  let limit = req.query.limit || 18;

  let { startIndex, endIndex, isNext, isPrevious } = pagination(
    page,
    limit,
    allPost
  );

  allPost = allPost.reverse().slice(startIndex, endIndex);

  res.json(new ApiResponse(200, { page, allPost, isNext, isPrevious }));
};

const createPost = async (req, res) => {
  if (!req.body.caption.length)
    return next(new ExpressError(422, "Field should not be empty."));
  let postImage;
  if (req.file) {
    const response = await uploadOnCloudinary(req.file.path);
    postImage = response.url;
  }

  let newPost = new Post({
    caption: req.body.caption,
    image: postImage,
    owner: req.user._id,
  });

  newPost = await newPost.save();
  res
    .status(201)
    .json(new ApiResponse(201, newPost, "Post created successfully."));
};

const getPost = async (req, res, next) => {
  let post = await Post.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.params.postid),
      },
    },
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
        likesCount: {
          $size: "$likes",
        },
        commentCount: {
          $size: "$comments",
        },
        owner: {
          $first: "$owner",
        },
        isLiked: {
          $cond: {
            if: {
              $in: [new mongoose.Types.ObjectId(req.user._id), "$likes.userId"],
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
  ]);

  !post.length
    ? next(new ExpressError(404, "Post Not Found."))
    : res.json(new ApiResponse(200, post[0]));
};

const updatePost = async (req, res, next) => {
  if (req.file) {
    const response = await uploadOnCloudinary(req.file.path);
    req.body.image = response.url;
  }

  let post = await Post.findOne({
    $and: [{ owner: req.user._id }, { _id: req.params.postid }],
  });

  if (!post) return next(new ExpressError(404, "Post not found"));

  let updatePost = await Post.findByIdAndUpdate(req.params.postid, req.body);
  res
    .status(200)
    .json(new ApiResponse(200, updatePost, "Post updated successfully."));
};

const deletePost = async (req, res, next) => {
  let post = await Post.findById(req.params.postid);
  if (!post) return next(new ExpressError(400, "Post not found."));

  post = await Post.findOne({
    $and: [{ owner: req.user._id }, { _id: req.params.postid }],
  });

  if (!post)
    return next(new ExpressError(400, "You cannot delete others post"));

  post = await Post.findByIdAndDelete(req.params.postid);
  res
    .status(200)
    .json(new ApiResponse(200, post, "Post Deleted Successfully."));
};

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
  getAllPost,
  getAllFolloedPost,
};
