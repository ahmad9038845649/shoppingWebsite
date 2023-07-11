const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const Order = require("../models/orderSchema");

router.post("/postOrder", async (req, res) => {
  try {
    const { email, password, total_amount, id } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Fill all Fields" });
    }

    //find by id
    const user = await User.findOne({ _id: id });

    // const user = await User.findOne({ email: email });
    if (user.email !== email) {
      return res.status(422).json({ error: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    // if password or email not matching
    if (!isMatch) {
      return res.status(422).json({ error: "Invalid Credentials" });
    }

    const { firstName, lastName, phone } = user;
    const newOrder = new Order({
      firstName,
      lastName,
      email,
      phone,
      moneyTransfered: total_amount,
    });

    await newOrder.save();
    res.status(201).json({ message: "user registered successfully" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
