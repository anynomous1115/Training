const CartProduct = require("../models/carts-products.model");
const Cart = require("../models/carts.model");
const Order = require("../models/orders.model");
const OrderDetail = require("../models/ordersDetail.model");
const Product = require("../models/products.model");
const User = require("../models/users.model");

const getOrdersDetailService = async (orderID, userID) => {
  const orderDetail = await OrderDetail.find({ orderID: orderID });
  const order = await Order.findOne({ _id: orderID });
  const products = await Product.find();

  const user = await User.findOne({ _id: userID });
  const { email } = user;
  return { orderDetail, products, email, order };
};

const createOrdersDetailService = async (orderID, userID) => {
  const cart = await Cart.findOne({ userID: userID });

  const cartProduct = await CartProduct.find({ cartID: cart._id });
  const copiedVariable = JSON.parse(JSON.stringify(cartProduct));

  for (const item of copiedVariable) {
    await OrderDetail.create({
      orderID: orderID,
      productID: item.productID,
      quantity: item.quantity,
      currentPrice: item.currentPrice,
      subTotal: item.currentPrice * item.quantity,
    });
  }
  const orderDetail = await OrderDetail.find({ orderID: orderID });
  return orderDetail;
};

module.exports = {
  getOrdersDetailService,
  createOrdersDetailService,
};
