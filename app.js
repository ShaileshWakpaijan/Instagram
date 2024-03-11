const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user.router")

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("Working");
});

app.use("/api/v1/user", userRoute)

app.use((err, req, res, next) => {
  let { success, statusCode = 500, message = "Something Went Wrong!" } = err;
  res.status(statusCode).json({ success, statusCode, message });
});


module.exports = { app };
