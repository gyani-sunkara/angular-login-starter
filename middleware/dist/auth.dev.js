"use strict";

var jwt = require("jsonwebtoken");

exports.auth = function (req, res, next) {
  var token = req.header("x-auth-token"); // Check for token

  if (!token) return res.status(401).json({
    msg: "Unauthorized"
  });

  try {
    // Verify token
    var decoded = jwt.verify(token, process.env.JWT_SECRET); // Add user from payload to request

    req.user = decoded;
    next();
  } catch (e) {
    return res.status(400).json({
      msg: "Forbidden"
    });
  }
};