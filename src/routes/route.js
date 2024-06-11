// import modules and user controller
const session = require("express-session");
const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const {
  userCreate,
  addMedia,
  usersGet,
  userUpdate,
  userDelete,
  deleteMedia,
  userLogin,
  userLogout,
} = require("../controllers/user.controller");

// GET index page
router.get("/", async (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    console.error(error);
  }
});

// GET register page
router.get("/register", async (req, res) => {
  try {
    res.render("pages/register");
  } catch (error) {
    console.error(error);
  }
});

// GET profile
router.get("/profile/:id", async (req, res) => {
  try {
    if (req.session && req.session.user) {
      const user = await User.findById(req.params.id);
      res.render("pages/userProfile", { user });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.error(error);
  }
});

// POST register new user
router.post("/register", userCreate);

// POST register add media
router.post("/addMedia", addMedia);

// GET complete registration page
router.get("/completeRegistration", async (req, res) => {
  try {
    res.render("pages/completeRegistration");
  } catch (error) {
    console.error(error);
  }
});

// GET login page
router.get("/login", async (req, res) => {
  try {
    res.render("pages/login");
  } catch (error) {
    console.error(error);
  }
});

// POST login user
router.post("/login", userLogin);

// GET homepage
router.get("/foryou", async (req, res) => {
  try {
    if (req.session && req.session.user) {
      const users = await usersGet();
      res.render("pages/foryou", { users });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.error(error);
  }
});

// GET settings user page
router.get("/settings", async (req, res) => {
  try {
    if (req.session && req.session.user) {
      res.render("pages/settings", { user: req.session.user });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.error(error);
  }
});

// GET profile user page
router.get("/profile", async (req, res) => {
  try {
    if (req.session && req.session.user) {
      res.render("pages/profile", { user: req.session.user });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.error(error);
  }
});

//  POST edit user
router.post("/edit", userUpdate);

// GET delete user
router.get("/delete", (req, res) => {
  try {
    if (req.session && req.session.user) {
      userDelete(req, res);
    } else {
      res.redirect("/login");
    }
  } catch (error) {
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
    console.error(error);
  }
});

// GET logout
router.get("/logout", userLogout);

// export route
module.exports = router;
