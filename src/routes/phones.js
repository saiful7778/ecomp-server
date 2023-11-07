const express = require("express");
const { phoneColl } = require("../db/mongoDB");
const serverError = require("../utility/serverError");
const dataAvailable = require("../utility/dataAvailable");
const { ObjectId } = require("mongodb");
const route = express.Router();

route.get("/", (req, res) => {
  const page = parseInt(req.query?.page || 0);
  const size = parseInt(req.query?.size);
  serverError(async () => {
    const resultLength = await phoneColl.estimatedDocumentCount();
    const result = await phoneColl
      .find()
      .skip(page * size)
      .limit(size)
      .toArray();
    const haveData = dataAvailable(result, res);
    if (haveData) {
      res.status(200).send({
        totalDataCount: resultLength,
        dataCount: result.length,
        data: result,
      });
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
