const loginModel = require("../models/signup.models");
const express = require("express");
const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const homemodel = require("../models/home.model");
app = express();
const signupModel = require("../models/signup.models");
const homeModel = require("../models/home.model");
require("dotenv").config();
const router = express.Router();

const webToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY, {
    expiresIn: "2h",
  });
};

router.post("/login", async (req, res) => {
  let user = await signupModel.findOne({ email: req.body.email });

  if (!user) {
    return res
      .status(400)
      .json({ status: "failed", message: "Register first!" });
  }
  const match = await bcrypt.compare(req.body.password, user.password);

  if (!match) {
    return res
      .status(400)
      .json({ status: "failed", message: "Email or password must be wrong" });
  }
  let token = await webToken(user);
  // res.cookie("name", user.name);
  // res.header("Authorization", token);
  res.send({ user, token });
});
router.post("/sign", async (req, res) => {
  let user = await signupModel.findOne({ email: req.body.email }).lean().exec();
  if (user) {
    return res.status(400).send("email already exists");
  } else {
    user = await signupModel.create(req.body);
    user.save();
    const token = webToken(user);
    user.token = token;
    return res.status(200).send({ user, token });
  }
});
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  // console.log(token);
  const bearert = token.split(" ");
  const t = bearert[1];
  jwt.verify(t, process.env.JWT_ACCESS_KEY, (err, user) => {
    if (err) return res.status(403).send("not applicable");
    console.log(user);
    req.user = user;
    next();
  });
};

router.post("/todos", verifyToken, async (req, res) => {
  let data = req.user;

  const mydata = await homemodel.findOne({ _id: data.user._id });
  if (mydata) {
    const d = await homemodel.updateOne(
      { _id: data.user._id },
      {
        $push: { todoData: { todo: req.body.todo } },
      },
      { new: true }
    );

    console.log(d);
    res.send(d);
  } else {
    const my = {
      _id: data.user._id,
      name: data.user.name,
      todoData: { todo: req.body.todo },
    };
    let s = await homemodel.create(my);
    console.log(s);
    res.send(s);
  }
});
router.get("/todos", verifyToken, async (req, res) => {
  const data = req.user;
  // console.log(data.user._id);
  let mydata = await homemodel.findById({ _id: data.user._id }).lean().exec();
  res.send(mydata);
});
router.delete("");

module.exports = router;
