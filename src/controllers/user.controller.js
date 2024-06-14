// import modules
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

/**
 * POST create user
 *
 * This function is responsible for handling the creation of a new user.
 * It takes in the request and response objects, and uses multer to handle file uploads.
 * It hashes the user's password using bcrypt, and creates a new user document in the database
 * with all the necessary information including the hashed password, profile picture, and media files.
 * Finally, it redirects the user to the completeRegistration page.
 */
const userCreate = async (req, res) => {
  try {
    // Handle file uploads
    upload.any()(req, res, async (err) => {
      if (err) console.error(err);

      // Hash the user's password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Extract the profile picture and media files from the uploaded files
      const mediaNames = [];
      let pfpName = "";
      req.files.forEach((file) => {
        if (file.fieldname === "memberPfp") pfpName = file.filename;
        else if (file.fieldname === "media") mediaNames.push(file.filename);
      });

      // Create a new user document in the database
      await User.create({
        ...req.body,
        password: hashedPassword,
        memberPfp: pfpName,
        media: mediaNames,
      });

      // Redirect the user to the completeRegistration page
      res.redirect("/completeRegistration");
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * POST login
 *
 * This function handles the login process for a user.
 * It takes in the request and response objects, and checks if the provided email and password match a user in the database.
 * If the login is successful, it creates a session for the user and redirects them to the foryou page.
 * If the login fails, it redirects the user to the login page.
 */
const userLogin = async (req, res) => {
  try {
    // Find a user in the database with the provided email
    const user = await User.findOne({ email: req.body.email });

    // Check if the user exists and if the provided password matches the user's password
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      // Create a session for the user
      req.session.user = user;

      // Redirect the user to the foryou page if the session was successfully created
      if (req.session) {
        res.redirect("foryou");
      } else {
        res.redirect("login");
      }
    } else {
      // Redirect the user to the login page if the login was unsuccessful
      res.redirect("login");
    }
  } catch (error) {
    // Log any errors that occur during the login process and redirect the user to the home page
    console.error(error);
    res.redirect("/");
  }
};

/**
 *
 * GET users
 *
 * This function retrieves all user documents from the database.
 * It returns an array of user documents.
 */
const usersGet = async (req, res) => {
  try {
    // Retrieve all user documents from the database
    const users = await User.find({});

    // Return the array of user documents
    return users;
  } catch (error) {
    // Log and re-throw any errors that occur
    console.error(error);
    throw error;
  }
};

/**
 * POST update user
 *
 * This function handles updating a user's information, including their profile picture.
 * It uses multer to handle file uploads and updates the user's document in the database
 * with the new information. Finally, it refreshes the user's session and redirects
 * the user to their profile page.
 */
const userUpdate = async (req, res) => {
  try {
    // Handle file uploads
    upload.single("memberPfp")(req, res, async (err) => {
      let pfpName;

      if (req.file) {
        // If a new profile picture is uploaded, update the user's document in the database
        pfpName = req.file.filename;
        fs.unlink(`public/uploads/${req.session.user.memberPfp}`, (err) => {
          if (err) {
            throw err;
          }
        });
      } else {
        // If no new profile picture is uploaded, keep the current profile picture
        pfpName = req.session.user.memberPfp;
      }

      // Update the user's document in the database with the new information
      await User.findByIdAndUpdate(
        req.session.user._id,
        {
          ...req.body,
          memberPfp: pfpName,
        },
        { new: true }
      );

      // Refresh the user's session
      req.session.user = await User.findById(req.session.user._id);
      req.session.save();

      // Redirect the user to their profile page
      res.redirect("/profile");
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 * POST update password
 *
 * This function handles updating a user's password.
 * It hashes the new password and updates the user's document in the database
 * with the new password. Finally, it refreshes the user's session and redirects
 * the user to their settings page.
 */
const passwordUpdate = async (req, res) => {
  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Update the user's document in the database with the new password
    await User.findByIdAndUpdate(req.session.user._id, {
      ...req.body,
      password: hashedPassword,
    });

    // Refresh the user's session
    req.session.user = await User.findById(req.session.user._id);
    req.session.save();

    // Redirect the user to their settings page
    res.redirect("/settings");
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * POST add media
 *
 * This function is responsible for adding media files to a user's media array.
 * It takes in the request and response objects, and uses multer to handle file uploads.
 * It updates the user document in the database with the new media files.
 * Finally, it redirects the user to the profile page.
 */
const addMedia = async (req, res) => {
  try {
    // Handle file uploads
    upload.any()(req, res, async (err) => {
      if (err) console.error(err);

      // Extract the media file names from the uploaded files
      const mediaNames = [];
      req.files.forEach((file) => {
        if (file.fieldname === "media") mediaNames.push(file.filename);
      });

      // Update the user document in the database with the new media files
      await User.findByIdAndUpdate(req.session.user._id, {
        $push: { media: mediaNames },
      });

      // Refresh the user session
      req.session.user = await User.findById(req.session.user._id);
      req.session.save();

      // Redirect the user to the profile page
      res.redirect("/profile");
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 * DELETE user
 *
 * This function is responsible for handling the deletion of a user.
 * It takes in the request and response objects, and uses the user's ID to find and delete the user document in the database.
 * Finally, it redirects the user to the home page.
 */
const userDelete = async (req, res) => {
  try {
    // Get the user's ID from the session
    const userId = req.session.user._id;

    // Find and delete the user document in the database
    await User.findByIdAndDelete(userId, req.body);

    // Redirect the user to the home page
    res.redirect("/");
  } catch (error) {
    // Log any errors that occur during the deletion process
    console.error(error);
  }
};

/**
 * DELETE media
 *
 * This function is responsible for handling the deletion of user media.
 * It takes in the request and response objects, and uses the user's ID to find and delete the media from the database.
 * Finally, it redirects the user to their profile page.
 */
const deleteMedia = async (req, res) => {
  try {
    // Get the user's ID from the session
    const userId = req.session.user._id;

    // Find and update the user document in the database
    // Remove the media from the user's media array
    await User.findByIdAndUpdate(userId, {
      $pull: { media: req.params.media },
    });

    // Delete the media file from the public/uploads directory
    fs.unlink(`public/uploads/${req.params.media}`, (err) => {
      if (err) {
        throw err;
      }
    });

    // Refresh the user's session
    req.session.user = await User.findById(req.session.user._id);
    req.session.save();

    // Redirect the user to their profile page
    res.redirect("/profile");
  } catch (error) {
    // Log any errors that occur during the deletion process
    console.error(error);
  }
};

/**
 *
 * GET logout
 *
 * Logs out a user by destroying their session.
 */
const userLogout = (req, res) => {
  try {
    // Destroy the user's session.
    req.session.destroy();

    // Redirect the user to the login page.
    res.redirect("/login");
  } catch (error) {
    // Log any errors that occur during the logout process.
    console.error(error);
  }
};

// export functions
module.exports = {
  userCreate,
  userLogin,
  usersGet,
  userUpdate,
  passwordUpdate,
  addMedia,
  userDelete,
  deleteMedia,
  userLogout,
};
