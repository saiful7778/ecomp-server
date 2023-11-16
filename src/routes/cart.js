const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const serverError = require("../utility/serverError");
const { cartColl } = require("../db/mongoDB");
const route = express.Router();

route.post("/", verifyToken, (req, res) => {
  const user = req.user;
  const queryEmail = req.query?.email;
  if (queryEmail !== user.email) {
    return res.status(403).send({ status: "invalid access" });
  }
  serverError(async () => {
    const result = await cartColl.find().toArray();
    if (!result) {
      return res
        .status(204)
        .send({ message: "not data found", success: false });
    }
    res.status(200).send({
      success: true,
      result,
    });
  }, res);
});

module.exports = route;
