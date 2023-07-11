const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const authenticate = require("../middleware/authenticate");
const generateToken = require("../generateToken");

// for sign up
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, confirmPassword } =
      req.body;

    // agar user na kisi data ko input ma add ni kai to
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      return res.status(422).json({ error: "Enter All Info" });
    }

    // check karain ga ka email db ka andar phla sa added to ni ha agar ma to wo return ho jai ga wrna save ho jai ga
    try {
      const userExists = await User.findOne({ email: email });

      if (userExists) {
        return res.status(422).json({ error: "Email Already Exists" });
      }

      // check password with confirm password
      if (password !== confirmPassword) {
        return res.status(422).json({ error: "Enter Same Password" });
      }

      // save into db
      const newUser = new User({
        firstName,
        lastName,
        email,
        phone,
        password,
        confirmPassword,
      });

      //   await newUser.save();
      //   newUser.token = generateToken(newUser._id);
      await newUser.save();
      res.status(201).json({ message: "user registered successfully" });
    } catch (error) {
      console.log(err);
    }
  } catch (error) {
    res.status(500).json({ message: "error->" + error });
  }
});

// for login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Enter All Info" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(422).json({ error: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    // if password or email not matching
    if (!isMatch) {
      return res.status(422).json({ error: "Invalid Credentials" });
    }

    res.json({
      _id: user._id,
      // userName: user.userName,
      // email: user.email,
      // phone: user.phone,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
