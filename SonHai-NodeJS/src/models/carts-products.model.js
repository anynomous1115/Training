const mongoose = require("mongoose");
const CartProductScheme = new mongoose.Schema(
  {
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
    cartID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "carts",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    currentPrice: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);
const CartProduct = mongoose.model("carts-products", CartProductScheme);
module.exports = CartProduct;
