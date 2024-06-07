// import modules
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const dotenv = require("dotenv").config();
const app = express();
const mailer = require("nodemailer");

// import middleware
const sessionMiddelware = require("./src/middleware/session.middelware.js");
const urlencodedMiddleware = require("./src/middleware/urlencoded.middleware.js");
// set middleware
app.use(urlencodedMiddleware);
app.use(sessionMiddelware);

// import route
const routes = require("./src/routes/route.js");
// set route
app.use("/", routes);

// set static files path
app.use(express.static(path.join(__dirname, "public")));

// set view engine
app.set("view engine", "ejs");
// set view engine path
app.set("views", path.join(__dirname, "src/views"));

// db connection
mongoose
  .connect(process.env.URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Node running on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("Connection error:", error);
    process.exit(1);
  });


