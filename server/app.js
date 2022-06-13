const express = require("express");
const bodyparser = require("body-parser");
app = express();
// app.use(bodyparser.json());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
// app.use(bodyparser.urlencoded({ extended: false }));
//mongoose
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
//   ..include .env
require("dotenv").config();
var cors = require("cors");
// const cookieParser = require("cookie-parser");
// app.use(cookieParser());
const controller = require("../server/src/controllers/signup.controller");
//middleware for json convertor parsing request of content-Type:json
app.use(express.json());
app.use("/", controller);
// const options = {
//   origin: false,
//   Credentials: true,
// };
app.use(cors());

function connect() {
  mongoose.connect("mongodb://127.0.0.1:27017", { dbName: "mytodos" });
}
//listen port
// console.log(process.env.PORT);
// app.set(process.env.PORT || 8080);
app.listen(8080, async () => {
  await connect();
  console.log("Server is live on port 8080");
});
