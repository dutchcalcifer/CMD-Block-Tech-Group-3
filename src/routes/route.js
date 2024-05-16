// import modules and user controller
const session = require("express-session")
const express = require("express");
const router = express.Router();
const {
  getUsers,
  newUser,
  loginUser,
} = require("../controllers/user.controller");

//index
//index page
router.get("/", async (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    console.error(error);
  }
});

// login
// login page
router.get("/login", async (req, res) => {
  try {
    res.render("pages/login");
  } catch (error) {
    console.error(error);
  }
});

// POST login account
router.post("/login", loginUser);

// register
// register page
router.get("/register", async (req, res) => {
  try {
    res.render("pages/register");
  } catch (error) {
    console.error(error);
  }
});

// POST register account
router.post("/register", newUser);

// home
// GET homepage
router.get("/home", async (req, res) => {
  try {
    const users = await getUsers();
    res.render("index", { users });
  } catch (error) {
    console.error(error);
  }
});

// export route
module.exports = router;
