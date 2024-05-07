// import modules and user controller
const express = require("express");
const router = express.Router();
const { getUsers } = require("../controllers/user.controller");

// GET
router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.render("index", { users });
  } catch (error) {
    console.error(error);
  }
});

// export route
module.exports = router;
