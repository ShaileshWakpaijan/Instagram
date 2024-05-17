const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const {
  validateLogin,
  validateUser,
} = require("../middlewares/Shema.middlewares");
const {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getUser,
  validateRegisterUser,
  searchUsers,
  getAllLikedPost,
  getUserPosts,
} = require("../controllers/user.controllers");

const { verifyJWT } = require("../middlewares/auth.middlewares");
const { upload } = require("../middlewares/Multer.middlewares");
const router = express.Router();

router.route("/verify-register").post(validateUser, wrapAsync(validateRegisterUser));

router
  .route("/register")
  .post(upload.single("profile"), wrapAsync(registerUser));

router.route("/login").post(validateLogin, wrapAsync(loginUser));

router.route("/logout").post(verifyJWT, wrapAsync(logoutUser));

router
  .route("/:username/update")
  .patch(verifyJWT, upload.single("profile"), wrapAsync(updateUser));

router.route("/search").get(verifyJWT, wrapAsync(searchUsers));

router.route("/:username").get(verifyJWT, wrapAsync(getUser));

router.route("/:username/posts").get(verifyJWT, wrapAsync(getUserPosts));

router.route("/:username/liked").get(verifyJWT, wrapAsync(getAllLikedPost));


module.exports = router;
