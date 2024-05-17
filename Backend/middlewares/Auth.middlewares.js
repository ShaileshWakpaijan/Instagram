const jwt = require("jsonwebtoken");
const ExpressError = require("../utils/ExpressError");
const User = require("../models/user.models");

module.exports.verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) return next(new ExpressError(401, "Unauthorized Request"));

    const decodeToken = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decodeToken._id).select(
      "-password -refreshToken"
    );

    if (!user) return next(new ExpressError(401, "Invalid accesss token."));

    req.user = user;
    next();
  } catch (error) {
    next(new ExpressError(401, error?.message || "Invalid access token."))
  }
};
