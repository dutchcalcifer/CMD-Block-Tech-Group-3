// import modules
const express = require("express");
const session = require("express-session");
const app = express();

// export middleware
module.exports = app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
