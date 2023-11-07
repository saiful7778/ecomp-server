const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const phonesRoute = require("./routes/phones");
const authRoute = require("./routes/auth");
const cartRoute = require("./routes/cart");

const port = process.env.PORT || 5001;

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5147"],
    methods: ["GET", "POST", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    status: "PhoneDir server is running",
  });
});

app.use("/phones", phonesRoute);
app.use("/auth", authRoute);
app.use("/cart", cartRoute);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
