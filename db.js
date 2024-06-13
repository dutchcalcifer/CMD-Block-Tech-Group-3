// import modules
const mongoose = require("mongoose");

// connect db
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI, {});
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

// export
module.exports = connectDB;
