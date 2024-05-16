// import user model
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

// POST login
const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (user) {
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        req.session.user = user;
        console.log("Login successful!");
        return res.redirect("login");
      } else {
        console.log("Incorrect password!");
      }
    } else {
      console.log("No user found!");
    }
    // If user or password is incorrect, or user not found
    res.status(401).redirect("login"); // Unauthorized
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).redirect("login"); // Internal Server Error
  }
};

// POST register
const newUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({ ...req.body, password: hashedPassword });
    res.redirect("/");
  } catch (error) {
    console.error(error);
  }
};

// GET
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// export functions
module.exports = {
  loginUser,
  getUsers,
  newUser,
};
