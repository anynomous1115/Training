const CartProduct = require("../models/carts-products.model");
const Cart = require("../models/carts.model");
const Order = require("../models/orders.model");
const OrderDetail = require("../models/ordersDetail.model");
const Product = require("../models/products.model");
const User = require("../models/users.model");

const getOrderService = async (order,userID) => {
  const orderDetail = await OrderDetail.find({ orderID: order._id });
  const products = await Product.find();

  const user = await User.findOne({ _id: userID });
  const { email } = user;
  return { orderDetail, products, email, order };
};

const paymentService = async (userID) => {
  const order = await Order.create({
    userID: userID,
    status: "Dang cho thanh toan!!",
  });

  const cart = await Cart.findOne({ userID: userID });

  const cartProduct = await CartProduct.find({ cartID: cart._id });
  const copiedVariable = JSON.parse(JSON.stringify(cartProduct));

  for (const item of copiedVariable) {
    await OrderDetail.create({
      orderID: order._id,
      productID: item.productID,
      quantity: item.quantity,
      currentPrice: item.currentPrice,
      subTotal: item.currentPrice * item.quantity,
    });
  }

  return order;
};

// const statusUpdateService = async (orderID, userID) => {
//   const order = await Order.findOne({ _id: orderID });
//   order.status = "Da thanh toan thanh cong";
//   await order.save();

//   const cart = await Cart.findOne({ userID: userID });
//   const cartProduct = await CartProduct.find({ cartID: cart._id });
//   const orderDetail = await OrderDetail.find({ orderID: order._id });

//   orderDetail.forEach((itemOrder) => {
//     for(const itemCart of cartProduct){
//       if (itemOrder.productID == itemCart.productID) {
//         if (itemOrder.quantity == itemCart.quantity) {
//           await CartProduct.deleteOne({
//             productID: itemCart.productID,
//             cartID: itemCart.cartID,
//           });
//         } else if (itemCart.quantity > itemOrder.quantity) {
//           itemCart.quantity = itemCart.quantity - itemOrder.quantity;
//           await cartProduct.save();
//         }
//       }
//     }
//   });
//   return;
// };
const statusUpdateService = async (orderID, userID) => {
  const order = await Order.findOne({ _id: orderID });
  order.status = "Da thanh toan thanh cong";
  await order.save();

  const cart = await Cart.findOne({ userID: userID });
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

    // for (const itemCart of cartProduct) {
    //   if (itemOrder.productID == itemCart.productID) {
    //     if (itemOrder.quantity == itemCart.quantity) {
    //       await CartProduct.deleteOne({
    //         productID: itemCart.productID,
    //         cartID: itemCart.cartID,
    //       });
    //     } else if (itemCart.quantity > itemOrder.quantity) {
    //       itemCart.quantity = itemCart.quantity - itemOrder.quantity;
    //       await itemCart.save();
    //     }
    //   }
    // }
  }
  return;
};

module.exports = { paymentService, statusUpdateService, getOrderService };
