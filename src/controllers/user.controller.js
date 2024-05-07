// import user model
const User = require("../models/user.model");

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
    await User.create(req.body);
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
