const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  moneyTransfered: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "pending",
  },
});

const orders = mongoose.model("orders", orderSchema);

module.exports = orders;
