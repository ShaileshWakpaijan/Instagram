const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
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
  await Comment.deleteMany({ postId: post._id });
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
