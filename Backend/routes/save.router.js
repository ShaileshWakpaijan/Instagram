const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { savePost, unSavePost } = require("../controllers/save.controllers");
const { verifyJWT } = require("../middlewares/Auth.middlewares");

router.route("/:postid/save").post(verifyJWT, wrapAsync(savePost));

router.route("/:postid/save").delete(verifyJWT, wrapAsync(unSavePost));

module.exports = router;
