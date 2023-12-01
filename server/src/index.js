const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const routes = require("./routes");
const { connectDB } = require("./db/index");

const app = express();
connectDB();
let allowedOrigin = ["http://localhost:5173"];
let apiPreFix = "/v1/apis/";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigin,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Side Is Running",
  });
});

//Routes
app.use(apiPreFix, routes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
