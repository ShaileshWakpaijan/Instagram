const { default: mongoose } = require("mongoose");
const Comment = require("../models/comment.model");
const Post = require("../models/post.model");
const ApiResponse = require("../utils/ApiResponse");
const ExpressError = require("../utils/ExpressError");
const pagination = require("../utils/pagination")

const postComment = async (req, res, next) => {
  let post = await Post.findById(req.params.postid);
  if (!post) return next(new ExpressError(404, "Post Not Found."));
  if (!req.body.comment)
    return next(new ExpressError(422, "Comment should not be empty."));

  let comment = await Comment.create({
    postId: req.params.postid,
    owner: req.user._id,
    comment: req.body.comment,
  });

  res.status(200).json(new ApiResponse(200, comment, "Comment Added."));
};

const deleteComment = async (req, res, next) => {
  let post = await Post.findById(req.params.postid);
  if (!post) return next(new ExpressError(404, "Post Not Found."));

  post = await Comment.findOneAndDelete({
    $and: [{ owner: req.user._id }, { _id: req.params.commentid }],
  });

  if (!post)
    return next(new ExpressError(403, "You cannot delete others comment"));

  res.status(200).json(new ApiResponse(200, "Comment deleted successfully."));
};

const getPostComments = async (req, res, next) => {
  let allComments = await Comment.aggregate([
    {
      $match: {
        postId: new mongoose.Types.ObjectId(req.params.postid),
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
      $addFields: {
        owner: {
          $first: "$owner",
        },
      },
    },
    {
      $project: {
        comment: 1,
        owner: 1,
        createdAt: 1,
      },
    },
  ]);

  let page = req.query.page || 1;
  let limit = req.query.limit || 15;

  let { startIndex, endIndex, isNext, isPrevious } = pagination(
    page,
    limit,
    allComments
  );

  allComments = allComments.reverse().slice(startIndex, endIndex);

  res.json(new ApiResponse(200, { page, allComments, isNext, isPrevious }));
};

module.exports = {
  postComment,
  deleteComment,
  getPostComments,
};
