const express = require("express");
const { verifyJWT } = require("../middlewares/auth.middlewares");
const wrapAsync = require("../utils/wrapAsync");
const {
  postComment,
  deleteComment,
  getPostComments,
} = require("../controllers/comment.controllers");
const router = express.Router();

router.route("/:postid").post(verifyJWT, wrapAsync(postComment));

router.route("/:postid").get(verifyJWT, wrapAsync(getPostComments));

router.route("/:postid").delete(verifyJWT, wrapAsync(deleteComment));

module.exports = router;
