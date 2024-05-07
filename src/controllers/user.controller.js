// import user model
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

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

// POST
const newUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({ ...req.body, password: hashedPassword });
    res.redirect("/");
  } catch (error) {
    console.error(error);
  }
};

// export functions
module.exports = {
  getUsers,
  newUser,
};
