const mongoose = require("mongoose");

const AreaSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    order: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Area", AreaSchema);
