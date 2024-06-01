const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Like = require("./like.model");
const Save = require("./save.model");
const Comment = require("./comment.model");
const Follow = require("./follow.model");
const Post = require("./post.model");
const { deleteOnCloudinary } = require("../utils/cloudinary");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      maxLength: 20,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      maxLength: 150,
      trim: true,
    },
    profilePicture: String,
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRY,
    }
  );
};

userSchema.post("findOneAndDelete", async (user) => {
  await Like.deleteMany({ userId: user._id });
  await Save.deleteMany({ userId: user._id });
  await Comment.deleteMany({ owner: user._id });
  await Follow.deleteMany({
    $or: [{ follower: user._id }, { following: user._id }],
  });

  let posts = await Post.find({ owner: user._id });

  posts.map(async (post) => {
    await Post.findOneAndDelete({ _id: post._id });
  });

  let imageArr = user?.profilePicture?.split("/");
  imageArr &&
    (await deleteOnCloudinary(imageArr[imageArr?.length - 1]?.split(".")[0]));
});

const User = mongoose.model("User", userSchema);

module.exports = User;
