const User = require("../models/user.model");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getUsers,
};
