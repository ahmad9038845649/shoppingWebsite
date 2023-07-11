const mongoose = require("mongoose");

const topCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { collection: "topCategories" }
);

const TopCategories = mongoose.model("topCategories", topCategorySchema);
module.exports = TopCategories;
