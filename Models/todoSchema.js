const mongoose = require("mongoose");
const user = require("./Users");

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    strict: false,
    versionKey: false,
  }
);

const todo = mongoose.model("todo", todoSchema);

module.exports = todo;
