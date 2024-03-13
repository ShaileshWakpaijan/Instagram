const { config } = require("dotenv");
const connectToDb = require("./db/index");
const { app } = require("./app");

config({
  path: "./.env",
});

connectToDb()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})

.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})