// import module
const mongoose = require("mongoose");

// user schema
const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    bandMembers: {
      type: Number,
      required: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },

    bandName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    memberPfp: {
      type: String,
    },

    isAdult: {
      type: Boolean,
    },

    genres: [
      {
        type: String,
      },
    ],

    userInstruments: [
      {
        type: String,
      },
    ],

    description: {
      type: String,
      required: true,
      max: 125,
    },

    country: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    postalCode: {
      type: String,
      required: true,
    },

    language: [
      {
        type: String,
      },
    ],

    media: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// set model to schema
const User = mongoose.model("User", UserSchema);

// export model
module.exports = User;
