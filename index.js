const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { phoneRoute, phonesRoute } = require("./src/routes/phones");
const authRoute = require("./src/routes/auth");
const cartRoute = require("./src/routes/cart");

const port = process.env.PORT || 5001;

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    status: "Ecomp server is running",
  });
});

app.use("/phone", phoneRoute);
app.use("/phones", phonesRoute);
app.use("/auth", authRoute);
app.use("/cart", cartRoute);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
