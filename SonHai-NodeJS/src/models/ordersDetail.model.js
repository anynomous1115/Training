const mongoose = require("mongoose");
const OrderDetailSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  orderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
  },
  quantity: {
    type: Number,
    require: true,
  },
  currentPrice: {
    type: Number,
    require: true,
  },
  subTotal: {
    type: Number,
    require: true,
  },
});
const OrderDetail = mongoose.model("orderDetail", OrderDetailSchema);
module.exports = OrderDetail;
