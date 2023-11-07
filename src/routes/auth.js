const express = require("express");
const jwt = require("jsonwebtoken");
const route = express.Router();
require("dotenv").config();

route.post("/", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "1h" });
  res
    .cookie("token", token, { httpOnly: true, secure: false })
    .send({ success: true });
});

module.exports = route;
