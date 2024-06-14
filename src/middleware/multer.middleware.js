// import modules
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  /**
   * Set the destination for storing uploaded files.
   */
  destination: (req, file, cb) => {
    // Set the destination for storing uploaded files to the 'public/uploads' directory.
    cb(null, path.join(__dirname, "../../public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Export middleware
module.exports = storage;
