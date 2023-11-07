const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const serverError = require("../utility/serverError");
const { cartColl } = require("../db/mongoDB");
const dataAvailable = require("../utility/dataAvailable");
const route = express.Router();

route.get("/", verifyToken, (req, res) => {
  const user = req.user;
  const queryEmail = req.query?.email;
  if (queryEmail !== user.email) {
    return res.status(403).send({ status: "invalid access" });
  }
  serverError(async () => {
    const result = await cartColl.find().toArray();
    const haveData = dataAvailable(result, res);
    if (haveData) {
      res.status(200).send(result);
    }
  }, res);
});

module.exports = route;
