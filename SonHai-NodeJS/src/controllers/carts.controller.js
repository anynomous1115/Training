const path = require("path");

const {
  getCartsService,
  createCartService,
} = require("../services/carts.service");
const { errorHandler } = require("../helper/handleError");
const { success } = require("../helper/success");

const createCart = async (req, res) => {
  try {
    const { _id } = req.accessTokenVerify;
    await createCartService(_id);
    success("Create a successful cart!", 200, res);
  } catch (error) {
    errorHandler(error, res, 500);
  }
};

const getCarts = async (req, res) => {
  try {
    const { _id } = req.accessTokenVerify;
    const cart = await getCartsService(_id);

    if (cart) {
      success("Cart already exists", 200, res, cart);
    } else {
      success("Cart already exists", 200, res, null);
    }
  } catch (error) {
    errorHandler(error, res, 500);
  }
};

module.exports = {
  createCart,
  getCarts,
};
