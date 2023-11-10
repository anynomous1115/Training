const CartProduct = require("../models/carts-products.model");
const Cart = require("../models/carts.model");
const Order = require("../models/orders.model");
const OrderDetail = require("../models/ordersDetail.model");

const createOrderService = async (userID) => {
  const cart = await Cart.findOne({ userID: userID });
  const cartsProducts = await CartProduct.find({ cartID: cart._id });

  if (cartsProducts.length === 0) {
    throw new Error("The shopping cart is empty");
  }
  const order = await Order.create({
    userID: userID,
    status: "Dang cho thanh toan!!",
  });

  return order;
};
const updateOrderService = async (orderID) => {
  const order = await Order.findOne({ _id: orderID });
  console.log(orderID);
  order.status = "Da thanh toan thanh cong";
  await order.save();

  const orderDetail = await OrderDetail.find({ orderID: order._id });

  for (const itemOrder of orderDetail) {
    const cartProductItem = await CartProduct.findOne({
      productID: itemOrder.productID,
    });
    if (itemOrder.quantity == cartProductItem.quantity) {
      await CartProduct.deleteOne({
        productID: cartProductItem.productID,
        cartID: cartProductItem.cartID,
      });
    } else if (cartProductItem.quantity > itemOrder.quantity) {
      cartProductItem.quantity = cartProductItem.quantity - itemOrder.quantity;
      await cartProductItem.save();
    }
  }
  return order;
};
module.exports = {
  createOrderService,
  updateOrderService,
};
