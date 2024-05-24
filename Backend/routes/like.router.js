const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { likePost, unLikePost } = require("../controllers/like.controllers");
const { verifyJWT } = require("../middlewares/Auth.middlewares");

router.route("/:postid/like").post(verifyJWT, wrapAsync(likePost));

router.route("/:postid/like").delete(verifyJWT, wrapAsync(unLikePost));

module.exports = router;
