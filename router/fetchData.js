const express = require("express");
const router = express.Router();
const Products = require("../models/productSchema");
const TopCategory = require("../models/topCategoryModel");

router.get("/products", async (req, res) => {
  try {
    const products = await Products.find({});
    res.send(products);
    console.log("asdfsadf");
  } catch (error) {
    console.log("asdfsadf");
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.get("/topCategories", async (req, res) => {
  try {
    const topCategory = await TopCategory.find();
    res.send(topCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
