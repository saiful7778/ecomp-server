const express = require("express");
const { phoneColl, cartColl } = require("../db/mongoDB");
const serverError = require("../utility/serverError");
const { ObjectId } = require("mongodb");
const route = express.Router();
const phonesRoute = express.Router();

phonesRoute.get("/", async (req, res) => {
  const page = parseInt(req.query?.page || 0);
  const size = parseInt(req.query?.size);
  const skip = page * size;
  serverError(async () => {
    const count = await phoneColl.estimatedDocumentCount();
    const result = await phoneColl.find().skip(skip).limit(size).toArray();
    if (!result.length) {
      return res
        .status(204)
        .send({ message: "not data found", success: false });
    }
    res.status(200).send({
      totalResult: count,
      count: result.length,
      success: true,
      result,
    });
  }, res);
});

route.get("/:phoneId", (req, res) => {
  const phoneId = req.params.phoneId;
  const query = { _id: new ObjectId(phoneId) };
  serverError(async () => {
    const result = await phoneColl.findOne(query);
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
const phoneRoute = route;
module.exports = { phoneRoute, phonesRoute };
