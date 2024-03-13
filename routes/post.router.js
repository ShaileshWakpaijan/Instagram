const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { verifyJWT } = require("../middlewares/auth.middlewares");
const {
  createPost,
  getPost,
  updatePost,
  deletePost,
  getAllPost,
} = require("../controllers/post.controllers");
const { upload } = require("../middlewares/Multer.middlewares");

router.route("/").get(getAllPost);

router.route("/").post(upload.single("postImage"), verifyJWT, wrapAsync(createPost));

router.route("/:postid").get(verifyJWT, wrapAsync(getPost));

router.route("/:postid").patch(verifyJWT, wrapAsync(updatePost));

router.route("/:postid").delete(verifyJWT, wrapAsync(deletePost));

module.exports = router;
