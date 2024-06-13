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
=======
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

// req params id

// GET read users
const usersGet = async (req, res) => {
>>>>>>> Stashed changes
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
=======
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
const sendResetLink = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const resetMessage = `
  <h1>Reset password request</h1>
  <p>You requested to rest your password. In order to so, click <a href="http://localhost:3000/reset/${user._id}">Here</a>.</p>
  <p>This link expires in 6 hours</p>`;
 const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS
    },
    tls: {
      rejectUnauthorized: false
  }
  });
  const info = await transporter.sendMail({
    from: 'Band Buddy <laurensantonmudde@gmail.com>',
    to: 'laurensantonmudde@gmail.com',
    subject: 'Reset password request',
    html: resetMessage,
  })
console.log("Message sent: " + info.messageId);
  res.redirect("/")
}

// new password 
const changePassword = async (req, res) => {
  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Update the user's document in the database with the new password
    await User.findByIdAndUpdate(req.params.id, {
      ...req.body,
      password: hashedPassword,
    });

    // Refresh the user's session
    req.session.user = await User.findById(req.params.id);
    req.session.save();

    // Redirect the user to their settings page
    res.redirect("/login");
  } catch (error) {
    console.error(error);
  }
};

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
  sendResetLink,
  changePassword,
>>>>>>> Stashed changes
};
