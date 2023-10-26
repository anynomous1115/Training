const Cart = require("../models/carts.model");

const getCartsService = async (userID) => {
  const cart = await Cart.findOne({ userID });
  return cart;
};

const createCartService = async (userID) => {
  const cart = await Cart.create({ userID });
  return cart;
};
module.exports = {
  getCartsService,
  createCartService,
};
