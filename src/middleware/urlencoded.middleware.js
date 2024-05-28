// import module
const express = require("express");

const urlencodedMiddleware = express.urlencoded({ extended: false });

//export middleware
module.exports = urlencodedMiddleware;
