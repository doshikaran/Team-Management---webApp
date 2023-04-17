const mongoose = require("mongoose");

const connectDB = async () => {
  const mongo = await mongoose.connect(process.env.MONGO_URI);
  console.log(`db connected : ${mongo.connection.host}`);
};
module.exports = connectDB;
