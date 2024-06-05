// import module
const bcrypt = require("bcrypt");
const multer = require("multer");

// import middleware
const storage = require("../middleware/multer.middleware");
// set middleware
const upload = multer({ storage: storage });

// import model
const User = require("../models/user.model");

// POST create user
const userCreate = async (req, res) => {
  try {
    upload.any()(req, res, async (err) => {
      if (err) console.error(err);
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const mediaNames = [];
      let pfpName = "";
      req.files.forEach((file) => {
        if (file.fieldname === "memberPfp") pfpName = file.filename;
        else if (file.fieldname === "media") mediaNames.push(file.filename);
      });
      await User.create({
        ...req.body,
        password: hashedPassword,
        memberPfp: pfpName,
        media: mediaNames,
      });
      res.redirect("/");
    });
  } catch (error) {
    console.error(error);
  }
};

// GET read users
const usersGet = async (req, res) => {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// POST update user
const userUpdate = async (req, res) => {
  try {
    const userId = req.session.user._id;
    await User.findByIdAndUpdate(userId, req.body);
    res.redirect("/profile");
  } catch (error) {
    console.error(error);
  }
};

// GET delete user
const userDelete = async (req, res) => {
  try {
    const userId = req.session.user._id;
    await User.findByIdAndDelete(userId, req.body);
    res.redirect("/");
  } catch (error) {
    console.error(error);
  }
};

// POST login user and create session
const userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      req.session.user = user;
      if (req.session) {
        res.redirect("foryou");
      } else {
        res.redirect("login");
      }
    } else {
      res.redirect("login");
    }
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
};

// GET logout user and destroy session
const userLogout = (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/login");
  } catch (error) {
    console.error(error);
  }
};

// export functions
module.exports = {
  userCreate,
  usersGet,
  userUpdate,
  userDelete,
  userLogin,
  userLogout,
};
