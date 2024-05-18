const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user.router")
const postRoute = require("./routes/post.router")
const followRoute = require("./routes/follow.router")
const likeRoute = require("./routes/like.router")
const saveRoute = require("./routes/save.router")
const commentRoute = require("./routes/comment.router")

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("Working");
});

app.use("/api/v1/user", userRoute)
app.use("/api/v1/post", postRoute)
app.use("/api/v1/follow", followRoute);
app.use("/api/v1/like", likeRoute);
app.use("/api/v1/save", saveRoute);
app.use("/api/v1/comment", commentRoute);

app.use((err, req, res, next) => {
  let { success, statusCode = 500, message = "Something Went Wrong!" } = err;
  res.status(statusCode).json({ success, statusCode, message });
});


module.exports = { app };
