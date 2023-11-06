const path = require("path");

const {
  getCartsService,
  createCartService,
} = require("../services/carts.service");
const { success, errorHandler } = require("../helper/response");

const createCart = async (req, res) => {
  try {
    const { _id } = req.accessTokenVerify;
    const cart = await createCartService(_id);
    success(res, cart, "Create a successful cart!", 201);
  } catch (error) {
    errorHandler(res, error.message, 500);
  }
};

const getCarts = async (req, res) => {
  try {
    const { _id } = req.accessTokenVerify;
    const cart = await getCartsService(_id);

    if (cart) {
      success(res, cart, "Cart already exists", 200);
    } else {
      success("Cart already exists", 200, res, null);
      success(res, null, "Cart does not exist", 200);
    }
  } catch (error) {
    errorHandler(res, error.message, 500);
  }
};

module.exports = {
  createCart,
  getCarts,
};
