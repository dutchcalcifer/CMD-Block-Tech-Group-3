// import user model
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const multer = require("multer");
const storage = require("../middleware/multer.middleware");
const upload = multer({ storage: storage });

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

const newUser = async (req, res) => {
  try {
    upload.single("memberPfp")(req, res, async (err) => {
      if (err) console.error(err);
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await User.create({
        ...req.body,
        password: hashedPassword,
        memberPfp: req.file.filename,
      });
      res.redirect("/");
    });
  } catch (error) {
    console.error(error)
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

// POST userUpdate
const userUpdate = async (req, res) => {
  try {
    const userId = req.session.user._id;
    await User.findByIdAndUpdate(userId, req.body);
    res.redirect("/home");
  } catch (error) {
    console.error(error);
  }
};

// GET userDelete
const userDelete = async (req, res) => {
  try {
    const userId = req.session.user._id;
    await User.findByIdAndDelete(userId, req.body);
    res.redirect("/home");
  } catch (error) {
    console.error(error);
  }
};

// export functions
module.exports = {
  loginUser,
  getUsers,
  newUser,
  userUpdate,
  userDelete,
};
