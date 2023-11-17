const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.registerUsers = async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (user) {
      res.status(409).json({ message: "User already exist" });
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await User.create({
      fullName: req.body.fullName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(201).json({message: "User created", data: newUser });
  } catch (err) {
    console.log(err);
  }
};
