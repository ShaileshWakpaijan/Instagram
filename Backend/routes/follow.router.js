const express = require("express");
const { verifyJWT } = require("../middlewares/Auth.middlewares");
const wrapAsync = require("../utils/wrapAsync");
const {
  followUser,
  unfollowUser,
  userFollowers,
  userFollowings,
  checkIsFollowing,
} = require("../controllers/follow.controllers");
const router = express.Router();

router
  .route("/:username/isfollowing")
  .get(verifyJWT, wrapAsync(checkIsFollowing));

router.route("/:username/follow").get(verifyJWT, wrapAsync(followUser));

router.route("/:username/unfollow").get(verifyJWT, wrapAsync(unfollowUser));

router.route("/:username/followers").get(verifyJWT, wrapAsync(userFollowers));

router.route("/:username/following").get(verifyJWT, wrapAsync(userFollowings));

module.exports = router;
