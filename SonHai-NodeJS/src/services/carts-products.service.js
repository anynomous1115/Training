const CartProduct = require("../models/carts-products.model");
const Cart = require("../models/carts.model");
const Product = require("../models/products.model");

const getCartItemOfUserLoggedInService = async (userID) => {
  const cart = await Cart.findOne({ userID });
  const catsProductsOfUser = await CartProduct.find({ cartID: cart._id });
  if (!catsProductsOfUser) {
    throw new Error("The product does not exist in the shopping cart!");
  }
  return catsProductsOfUser;
};

const addToCartService = async (
  productID,
  quantityProd,
  currentPrice,
  userID
) => {
  const cart = await Cart.findOne({ userID });
  const productCheck = await Product.findOne({ _id: productID });
  if (!productCheck) {
    throw new Error("The product does not exist in stock!");
  }

  const cartProduct = {
    cartID: cart._id,
    productID: productID,
    quantity: quantityProd,
    currentPrice: currentPrice,
  };
  const cartsProductsCreate = await CartProduct.create(cartProduct);
  return cartsProductsCreate;
};

const removeItemService = async (cartProductID) => {
  const cartProduct = await CartProduct.findOneAndDelete({
    _id: cartProductID,
  });
  if (!cartProduct) {
    throw new Error("The product does not exist in the shopping cart!");
  }
  return cartProduct;
};

const updateItemService = async (cartProductID, quantity )=> {
  const cartProduct = await CartProduct.findOne({
    _id:cartProductID
  });
  cartProduct.quantity = quantity;
  return await cartProduct.save();
};

module.exports = {
  getCartItemOfUserLoggedInService,
  addToCartService,
  removeItemService,
  updateItemService,
};
