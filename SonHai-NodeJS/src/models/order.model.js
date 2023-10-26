const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});
const Order = mongoose.model("order", OrderSchema);
module.exports = Order;
