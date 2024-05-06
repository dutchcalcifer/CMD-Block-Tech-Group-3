const express = require("express");
const router = express.Router();
const { getUsers } = require("../controllers/user.controller");

// get all games
router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.render("index", { users });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
