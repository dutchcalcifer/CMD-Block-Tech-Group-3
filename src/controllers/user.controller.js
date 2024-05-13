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
        console.log("login succes!");
        res.redirect("login");
      } else {
        console.log("Password incorect!");
        res.redirect("login");
      }
    } else {
      console.log("no user found!");
      res.redirect("login");
    }
  } catch {
    console.log("error");
    res.redirect("login");
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
