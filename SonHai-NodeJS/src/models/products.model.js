const mongoose = require("mongoose");
const ProductShema = new mongoose.Schema({
  productName: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  imageHover: {
    type: String,
    require: true,
  },
  disCount: {
    type: Number,
    require: true,
  },
  originalPrice: {
    type: Number,
    require: true,
  },
  colors: [
    {
      type: String,
    },
  ],
  sizes: [
    {
      type: String,
    },
  ],
});
const Product = mongoose.model("products", ProductShema);
module.exports = Product;
