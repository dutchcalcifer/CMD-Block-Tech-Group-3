// Importing required modules and the user controller
const session = require("express-session");
const express = require("express");
const User = require("../models/user.model");
const router = express.Router();

// Importing functions from the user controller in "../controllers/user.controller"
const {
  userCreate,
  userLogin,
  usersGet,
  userUpdate,
  passwordUpdate,
  addMedia,
  userDelete,
  deleteMedia,
  userLogout,
} = require("../controllers/user.controller");

// Handle GET requests to the root URL ("/")
// Renders the "index" view
router.get("/", async (req, res) => {
  try {
    // Render the "index" view
    res.render("index");
  } catch (error) {
    // Log any errors that occur
    console.error(error);
  }
});

// Handles GET requests to the "/register" URL and renders the "register" view
// Renders the "register" view
router.get("/register", async (req, res) => {
  try {
    // Render the "register" view
    res.render("pages/register");
  } catch (error) {
    // Log any errors that occur
    console.error(error);
  }
});

// Handles POST requests to the "/register" URL
router.post("/register", userCreate);

// Handles GET requests to the "/completeRegistration" URL
// Renders the "completeRegistration" view
router.get("/completeRegistration", async (req, res) => {
  try {
    // Render the "completeRegistration" view
    res.render("pages/completeRegistration");
  } catch (error) {
    // Log any errors that occur
    console.error(error);
  }
});

// Handles GET requests to the "/login" URL
// Renders the "login" view
router.get("/login", async (req, res) => {
  try {
    // Render the "login" view
    res.render("pages/login");
  } catch (error) {
    // Log any errors that occur
    console.error(error);
  }
});

// Handles POST requests to the "/login" URL
router.post("/login", userLogin);

// Handle GET requests to the "/foryou" URL
// Renders the "foryou" view
router.get("/foryou", async (req, res) => {
  try {
    // Check if the user is authenticated
    if (req.session && req.session.user) {
      // Retrieve all users
      const users = await usersGet();
      // Render the "foryou" view with the retrieved users
      res.render("pages/foryou", { users });
    } else {
      // Redirect the user to the login page
      res.redirect("/login");
    }
  } catch (error) {
    // Log any errors that occur
    console.error(error);
  }
});

// Handles GET requests to the "/profile/:id" URL
// Renders the "userProfile" view
router.get("/profile/:id", async (req, res) => {
  try {
    // Check if the user is logged in
    if (req.session && req.session.user) {
      // Find the user with the given ID and render the "userProfile" view with the user's data
      const user = await User.findById(req.params.id);
      res.render("pages/userProfile", { user });
    } else {
      // If the user is not logged in, redirect them to the login page
      res.redirect("/login");
    }
  } catch (error) {
    // Log any errors that occur
    console.error(error);
  }
});

// Handle GET requests to the "/profile" URL
// Renders the "profile" view
router.get("/profile", async (req, res) => {
  try {
    // Check if the user is authenticated
    if (req.session && req.session.user) {
      // Render the "profile" view with the user object
      res.render("pages/profile", { user: req.session.user });
      const user = req.session.user
      console.log("User genres", user)

    } else {
      // Redirect the user to the login page
      res.redirect("/login");
    }
  } catch (error) {
    // Log any errors that occur
    console.error(error);
  }
});

// Handle GET requests to the "/settings" URL
//Renders the "settings" view
router.get("/settings", async (req, res) => {
  try {
    // Check if the user is authenticated
    if (req.session && req.session.user) {
      // Render the "settings" view with the user object
      res.render("pages/settings", { user: req.session.user });
    } else {
      // Redirect the user to the login page
      res.redirect("/login");
    }
  } catch (error) {
    // Log any errors that occur
    console.error(error);
  }
});

//  POST edit user
router.post("/edit", userUpdate);

//  POST edit user password
router.post("/editPassword", passwordUpdate);

// Handles POST requests to the "/addMedia" URL
router.post("/addMedia", addMedia);

// GET delete user
router.get("/delete", (req, res) => {
  try {
    if (req.session && req.session.user) {
      userDelete(req, res);
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    // Log any errors that occur
    console.error(error);
  }
});

// GET delete media
router.post("/deleteMedia/:media", (req, res) => {
  try {
    if (req.session && req.session.user) {
      deleteMedia(req, res);
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    // Log any errors that occur
    console.error(error);
  }
});

// GET logout
router.get("/logout", userLogout);

// export route
module.exports = router;
