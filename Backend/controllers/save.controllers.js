const Save = require("../models/save.model");
const Post = require("../models/post.model");
const ApiResponse = require("../utils/ApiResponse");
const ExpressError = require("../utils/ExpressError");

const savePost = async (req, res, next) => {
  let post = await Post.findById(req.params.postid);
  if (!post) return next(new ExpressError(404, "Post Not Found"));

  post = await Save.findOne({
    $and: [{ userId: req.user._id }, { postId: req.params.postid }],
  });

  if (post) return next(new ExpressError(409, "You already saved this post"));

  await Save.create({
    userId: req.user._id,
    postId: req.params.postid,
  });

  res.status(200).json(new ApiResponse(200, "Post added to saved."));
};

const unSavePost = async (req, res, next) => {
  let post = await Post.findById(req.params.postid);
  if (!post) return next(new ExpressError(404, "Post Not Found"));

  post = await Save.findOneAndDelete({
    $and: [{ userId: req.user._id }, { postId: req.params.postid }],
  });

  if (!post)
    return next(new ExpressError(400, "You already not saved this post"));

  res.status(200).json(new ApiResponse(200, "Post remove from saved."));
};

module.exports = {
  savePost,
  unSavePost,
};
