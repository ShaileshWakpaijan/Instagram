const mongoose = require("mongoose");

const connectToDb = async () => {
  try{mongoose.connect(process.env.DBURI);}
  catch(error) {
    console.log("MONGODB connection failed", error)
  }
};

module.exports = connectToDb