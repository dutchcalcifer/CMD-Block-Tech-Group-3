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

// export functions
module.exports = {
  getUsers,
};
