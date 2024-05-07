// import mongoose module
const mongoose = require("mongoose");

// user schema
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      unique: true,
    },

    userInstruments: [
      {
        type: String,
        trim: true,
      },
    ],

    userInstrumentsRequest: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// set user model
const User = mongoose.model("User", UserSchema);

// export user model
module.exports = User;
