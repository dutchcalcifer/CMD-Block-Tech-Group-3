// import modules
const express = require("express");
const session = require("express-session");
const app = express();

// Express-session middleware to manage user sessions
module.exports = app.use(
  session({
    secret: "secret-key", // The secret key used to sign the session ID cookie
    resave: false, // Do not save session if unmodified
    saveUninitialized: false, // Do not create session until something is stored
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
