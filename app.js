// import modules, route handlers and middleware
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv").config();
const routes = require("./src/routes/route.js");
const app = express();

// serve static files
app.use(express.static(path.join(__dirname, "public")));

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

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
