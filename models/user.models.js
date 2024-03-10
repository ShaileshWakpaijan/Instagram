const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

const User = mongoose.model("User", userSchema);

module.exports = User;
