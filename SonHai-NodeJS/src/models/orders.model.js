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
  status: {
    type: String,
    require: true,
  },
});
const Order = mongoose.model("orders", OrderSchema);
module.exports = Order;
