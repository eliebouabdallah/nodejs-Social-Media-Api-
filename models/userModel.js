const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please enter your fullname"],
      minlength: 5,
      trim: true,
    },

    username: {
      type: String,
      unique: true,
      required: [true, "Please enter your username"],
      minlength: 5,
      maxlength: 12,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Please enter your email"],
    },

    password: {
      type: String,
      minlength: 8,
      trim: true,
      required: [true, "Please enter your password"],
    },

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
