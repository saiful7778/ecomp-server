const express = require("express");
const { phoneColl } = require("../db/mongoDB");
const serverError = require("../utility/serverError");
const { ObjectId } = require("mongodb");
const route = express.Router();
const phonesRoute = express.Router();

phonesRoute.get("/", async (req, res) => {
  const { page, size, type, sort } = req.query;
  const skip = parseInt(page || 0) * parseInt(size || 10);
  serverError(async () => {
    const totalCount = await phoneColl.estimatedDocumentCount();
    let query = phoneColl.find();

    if (type) {
      query = query.filter({ type });
    }

    if (sort === "asc") {
      query = query.sort({ price: 1 });
    } else if (sort === "dsc") {
      query = query.sort({ price: -1 });
    }
    const result = await query.skip(skip).limit(parseInt(size)).toArray();
    res.status(200).send({
      totalResult: totalCount,
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
