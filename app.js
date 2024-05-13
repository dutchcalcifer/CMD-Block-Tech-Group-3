// import modules, routes and middleware
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const dotenv = require("dotenv").config();
const routes = require("./src/routes/route.js");
const urlencodedMiddleware = require("./src/middleware/urlencoded.middleware.js");
const app = express();

// set static files folder
app.use(express.static(path.join(__dirname, "public")));

// set view engine
app.set("view engine", "ejs");
// set view engine folder
app.set("views", path.join(__dirname, "src/views"));

// middleware
app.use(urlencodedMiddleware);

// routes
app.use("/", routes);

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
