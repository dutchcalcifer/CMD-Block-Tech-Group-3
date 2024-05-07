// import modules and user controller
const express = require("express");
const router = express.Router();
const { getUsers, newUser } = require("../controllers/user.controller");

// create account page
router.get("/create", async (req, res) => {
  try {
    res.render("pages/create");
  } catch (error) {
    console.error(error);
  }
});

// GET
router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.render("index", { users });
  } catch (error) {
    console.error(error);
  }
});

// POST
router.post("/create", newUser);

// export route
module.exports = router;
