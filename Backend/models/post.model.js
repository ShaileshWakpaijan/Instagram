const mongoose = require("mongoose");
const Like = require("./like.model");
const Save = require("./save.model");
const Comment = require("./comment.model");
const { deleteOnCloudinary } = require("../utils/cloudinary");

const postSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    caption: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

postSchema.post("findOneAndDelete", async (post) => {
  await Like.deleteMany({ postId: post._id });
  await Save.deleteMany({ postId: post._id });
  await Comment.deleteMany({ postId: post._id });
  let imageArr = post?.image?.split("/");
  imageArr &&
    (await deleteOnCloudinary(imageArr[imageArr?.length - 1]?.split(".")[0]));
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
