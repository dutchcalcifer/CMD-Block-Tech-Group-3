// import module
const express = require("express");

// Parse URL-encoded data from the body of HTTP requests.
const urlencodedMiddleware = express.urlencoded({ extended: false });

//export middleware
module.exports = urlencodedMiddleware;
