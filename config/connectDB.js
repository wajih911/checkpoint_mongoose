const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" }); // import db via .env

const connectDB = async () => {
  // connectBD is a function to create cnx between the db and the server
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log({ msg: "The database is connected" });
  } catch (error) {
    console.log({ msg: "database in not connected", error });
  }
};

module.exports = connectDB;
