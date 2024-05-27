// import modules and user controller
const session = require("express-session")
const express = require("express");
const router = express.Router();
const {
  getUsers,
  newUser,
  loginUser,
  userUpdate,
  userDelete
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
  if(req.session && req.session.user) {
    try {
      const users = await getUsers();
      res.render("index", { users });
    } catch (error) {
      console.error(error);
      res.redirect('login')
    }
  }
  else {
    res.redirect('login')
  }
});

//  GET edit
router.get("/edit", async (req, res) => {
  if(req.session && req.session.user) {
    try {
      res.render("pages/edit", { user : req.session.user })
    }
    catch (error) {
      console.error(error);
    }
  }
})

//  GET userDelete
router.get("/delete", userDelete);


//  POST edit update 
router.post("/edit", userUpdate) 


// register-genres
// register-genres page
router.get("/register-genres", async (req, res) => {
  try {
    res.render("pages/register-genres");
  } catch (error) {
    console.error(error);
  }
});


// export route
module.exports = router;
