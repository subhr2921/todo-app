const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose
      .connect(`${process.env.MONGO_URL}${process.env.DB_NAME}`)
      .then(() => {
        console.log("connection successfully ");
      })
      .catch((error) => {
        console.log("error in db connection", error.message);
      });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = { connectDB };
