const CartProduct = require("../models/carts-products.model");
const Cart = require("../models/carts.model");
const Product = require("../models/products.model");

const getCartItemOfUserLoggedInService = async (userID) => {
  try {
    const cart = await Cart.findOne({ userID });
    const catsProductsOfUser = await CartProduct.find({ cartID: cart._id });
    if (!catsProductsOfUser) {
      res.status(404).json({
        status: 404,
        message: "The product does not exist in the shopping cart!",
      });
      return;
    }
    return catsProductsOfUser;
  } catch (error) {
    console.log({ message: "Something went wrong! cartsItem" });
  }
};

const addToCartService = async (productID, quantityProd, userID) => {
  const cart = await Cart.findOne({ userID });
  const productCheck = await Product.findOne({ _id: productID });
  if (!productCheck) {
    console.log("The product does not exist in stock!");
    return;
  }

  const cartProduct = {
    cartID: cart._id,
    productID: productID,
    quantity: quantityProd,
  };
  const cartsProductsCreate = await CartProduct.create(cartProduct);
  return cartsProductsCreate;
};

const removeItemService = async (reqParamsID, userID) => {
  try {
    const cart = await Cart.findOne({ userID });

    const cartProduct = await CartProduct.findOneAndDelete({
      cartID: cart._id,
      productID: reqParamsID,
    });
    if (!cartProduct) {
      console.log({
        status: 404,
        message: "The product does not exist in the shopping cart!",
      });
      return;
    }
    return cartProduct;
  } catch (error) {
    console.log({ message: "Something went wrong!" });
  }
};

const updateItemService = async (productID, quantityProd, userID) => {
  const cart = await Cart.findOne({ userID });
  const product = await CartProduct.findOne({
    cartID: cart._id,
    productID: productID,
  });
  product.quantity = quantityProd;
  return await product.save();
};

module.exports = {
  getCartItemOfUserLoggedInService,
  addToCartService,
  removeItemService,
  updateItemService,
};
