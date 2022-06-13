const mongoose = require("mongoose");
const loginmodel = require("../models/signup.models");

const todoSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: loginmodel,
  },
  name: { type: String },
  todoData: [{ todo: String }],
});

module.exports = mongoose.model("mytodo", todoSchema);
