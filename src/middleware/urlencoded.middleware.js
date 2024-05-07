const express = require("express");
const urlencodedMiddleware = express.urlencoded({ extended: false });

module.exports = urlencodedMiddleware;
