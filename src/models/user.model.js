// Import the mongoose module
const mongoose = require("mongoose");

// Define the user schema
const UserSchema = mongoose.Schema(
  {
    // User's email
    email: {
      type: String,
      required: true,
      trim: true,
    },

    // Number of band members
    bandMembers: {
      type: Number,
      required: true,
    },

    // User's password
    password: {
      type: String,
      required: true,
      trim: true,
    },

    // Name of the band
    bandName: {
      type: String,
      required: true,
      trim: true,
    },

    // Profile picture of a band member
    memberPfp: {
      type: String,
    },

    // Indicates if the user is an adult
    isAdult: {
      type: Boolean,
    },

    // Genres the user plays
    genres: [{ type: String }],

    // Instruments the user plays
    userInstruments: [{ type: String }],

    // Description of the user
    description: {
      type: String,
      required: true,
      max: 125,
    },

    // Country of the user
    country: {
      type: String,
      required: true,
    },

    // City of the user
    city: {
      type: String,
      required: true,
    },

    // Postal code of the user
    postalCode: {
      type: String,
      required: true,
    },

    // Languages spoken by the user
    language: [{ type: String }],

    // Media (videos or audio) uploaded by the user
    media: [{ type: String }],
  },
  { timestamps: true }
);

// Create the User model from the UserSchema
const User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;
