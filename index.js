const { config } = require("dotenv");
config({
  path: "./.env",
});

const connectToDb = require("./db/index");
const { app } = require("./app");

connectToDb()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })

  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
