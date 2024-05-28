// import modules and user controller
const session = require("express-session");
const express = require("express");
const router = express.Router();
const {
  userCreate,
  usersGet,
  userUpdate,
  userDelete,
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

// POST register new user
router.post("/register", userCreate);

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

//  POST edit user
router.post("/edit", userUpdate);

// GET delete
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

// GET logout
router.get("/logout", userLogout);

// export route
module.exports = router;
