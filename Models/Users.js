const mongoose = require("mongoose");
const validator = require("validator");
const Product = require("./products");
const todo = require("./todoSchema");
const Posts = require("./BlogPost");
const Comments = require("./comments");
const Orders = require("./orders");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email address",
    },
  },
  image: {
    type: String,
  },
  registrationDate: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  username: {
    type: String,
    // required: true
  },
  age: {
    type: Number,
    // required: true
  },
  phone: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
  },
  numOfBaby: {
    type: Number,
    // required: true,
  },
  role: {
    type: String,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  babyInfo: [
    {
      name: String,
      weight: Number,
      height: Number,
      headSize: Number,
      birthDate: Date,
      temperature: Number,
      vaccination: [],
      extraInfo: [
        {
          foodTracker: String,
          kindOfFood: String,
        },
      ],
      reportFile: String,
    },
  ],
  todo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "todo",
  },
  blogs: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posts",
  },
  comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comments",
  },
  orders: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Orders",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
