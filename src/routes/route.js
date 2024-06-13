// import modules and user controller
const express = require("express");
const router = express.Router();
const {
  getUsers,
  newUser,
  loginUser,
  userCreate,
  addMedia,
  usersGet,
  userUpdate,
  userDelete,
  deleteMedia,
  userLogin,
  userLogout,
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

// POST login user
router.post("/login", userLogin);

// register
// register page
router.get("/register", async (req, res) => {
  try {
    res.render("pages/forgot");
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

// export route
module.exports = router;
