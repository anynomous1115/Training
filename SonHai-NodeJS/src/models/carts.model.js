const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);
const Cart = mongoose.model("carts", CartSchema);
module.exports = Cart;
