const express = require("express");
const { phoneColl } = require("../db/mongoDB");
const serverError = require("../utility/serverError");
const dataAvailable = require("../utility/dataAvailable");
const { ObjectId } = require("mongodb");
const route = express.Router();

route.get("/", (req, res) => {
  serverError(async () => {
    const result = await phoneColl.find().toArray();
    const haveData = dataAvailable(result, res);
    if (haveData) {
      res.status(200).send(result);
    }
  }, res);
});

route.get("/:phoneId", (req, res) => {
  const phoneId = req.params.phoneId;
  serverError(async () => {
    const query = { _id: new ObjectId(phoneId) };
    const result = await phoneColl.findOne(query);
    const haveData = dataAvailable(result, res);
    if (haveData) {
      res.status(200).send(result);
    }
  }, res);
});

module.exports = route;
