// import module
const bcrypt = require("bcrypt");
const multer = require("multer");
const fs = require("fs");
const nodeMailer = require("nodemailer");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");

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

const addMedia = async (req, res) => {
  try {
    upload.any()(req, res, async (err) => {
      if (err) console.error(err);
      const mediaNames = [];
      req.files.forEach((file) => {
        if (file.fieldname === "media") mediaNames.push(file.filename);
      });
      console.log(mediaNames)
      await User.findByIdAndUpdate(req.session.user._id, {
        $push: { media: mediaNames },
      });
      req.session.user = await User.findById(req.session.user._id);
      req.session.save();
      res.redirect("/profile");
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
    upload.single("memberPfp")(req, res, async (err) => {
      if (req.file) {
        pfpName = req.file.filename;
        fs.unlink(`public/uploads/${req.session.user.memberPfp}`, (err) => {
          if (err) {
            throw err;
          }
        });
      } else {
        pfpName = req.session.user.memberPfp;
      }
      await User.findByIdAndUpdate(
        req.session.user._id,
        {
          ...req.body,
          memberPfp: pfpName,
        },
        { new: true }
      );
      req.session.user = await User.findById(req.session.user._id);
      req.session.save();
      res.redirect("/profile");
    });
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

// GET delete media
const deleteMedia = async (req, res) => {
  try {
    const userId = req.session.user._id;
    console.log(req.params)
    await User.findByIdAndUpdate(userId, {
      $pull: { media: req.params.media },
    });
    fs.unlink(`public/uploads/${req.params.media}`, (err) => {
      if (err) {
        throw err;
      }
    });
    req.session.user = await User.findById(req.session.user._id);
    req.session.save();
    res.redirect("/profile");
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

// mail function

// const html = `
//   <h1>Bro</h1>
//   <p>What is wrong with you</p>`;

// async function mail() {
//  const transporter = nodeMailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//       user: 'laurensantonmudde@gmail.com',
//       pass: 'aolk mfzq hrgp uoiy'
//     },
//     tls: {
//       rejectUnauthorized: false
//   }
//   });
//   const info = await transporter.sendMail({
//     from: 'Band Buddy <laurensantonmudde@gmail.com>',
//     to: 'laurensantonmudde@gmail.com',
//     subject: 'Test',
//     html: html,
//   })
// console.log("Message sent: " + info.messageId);

// }

// mail()
// .catch(e => console.log(e));

// export functions
module.exports = {
  userCreate,
  addMedia,
  usersGet,
  userUpdate,
  userDelete,
  deleteMedia,
  userLogin,
  userLogout,
};
