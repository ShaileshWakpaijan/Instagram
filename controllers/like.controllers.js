const Like = require("../models/like.model");
const Post = require("../models/post.models");
const ApiResponse = require("../utils/ApiResponse");
const ExpressError = require("../utils/ExpressError");

const likePost = async (req, res, next) => {
  let post = await Post.findById(req.params.postid);
  if (!post) return next(new ExpressError(404, "Post Not Found"));

  post = await Like.findOne({
    $and: [{ userId: req.user._id }, { postId: req.params.postid }],
  });

  if (post) return next(new ExpressError(409, "You already liked this post"));

  await Like.create({
    userId: req.user._id,
    postId: req.params.postid,
  });

  res.status(200).json(new ApiResponse(200, "Post liked successfully."));
};

const unLikePost = async (req, res, next) => {
  let post = await Post.findById(req.params.postid);
  if (!post) return next(new ExpressError(404, "Post Not Found"));

  post = await Like.findOneAndDelete({
    $and: [{ userId: req.user._id }, { postId: req.params.postid }],
  });

  if (!post)
    return next(new ExpressError(400, "You already not liked this post"));

  res.status(200).json(new ApiResponse(200, "Post unlike successfully."));
};

module.exports = {
  likePost,
  unLikePost,
};
