// const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const signupSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  token: { type: String },
});

//hook
signupSchema.pre("save", function (next) {
  if (this.isModified("password")) return next();
  if (this.password) {
    //generationg salt
    var salt = bcrypt.genSaltSync(10);
    //hashing the password with salt
    this.password = bcrypt.hashSync(this.password, salt);
    console.log(this.password);
  }
  //moving to next
  return next();
});
// signupSchema.methods.checkpwd = function (password) {
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(password, this.password, function (err, res) {
//       if (err) return reject(err);
//       return resolve(res);
//     });
//   });
// };
const signupModel = mongoose.model("Signup", signupSchema);
// const loginModel = mongoose.model("login", loginSchema);
module.exports = signupModel;
// module.exports = webToken;
