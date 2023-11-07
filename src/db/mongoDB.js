const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = process.env.CONNECT_LINK;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const phoneDirDB = client.db("phoneDirDB");
const phoneColl = phoneDirDB.collection("phones");
const cartColl = phoneDirDB.collection("cart");

module.exports = { phoneColl, cartColl };
