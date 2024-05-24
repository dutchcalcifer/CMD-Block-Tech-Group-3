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

    isSoloArtist: {
      type: Boolean,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },

    bandName: {
      type: String,
      unique: true,
    },

    memberName: [
      {
        type: String,
      },
    ],

    memberPfp: [
      {
        type: String,
      },
    ],

    memberGender: [
      {
        type: String,
        required: true,
      },
    ],

    memberBirthday: [
      {
        type: Date,
        required: true,
      },
    ],

    genres: [
      {
        type: String,
        required: true,
      },
    ],

    userInstruments: [
      {
        type: String,
        required: true,
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
