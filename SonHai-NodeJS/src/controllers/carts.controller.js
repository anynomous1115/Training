const {
  getCartsService,
  createCartService,
} = require("../services/carts.service");
const { successHandler, errorHandler } = require("../helper/response");

const createCart = async (req, res) => {
  try {
    const { _id } = req.accessTokenVerify;
    const cart = await createCartService(_id);
    successHandler(res, cart, "Create a successful cart!", 201);
  } catch (error) {
    errorHandler(res, "Bad Request !", 400, error.message);
  }
};

const getCarts = async (req, res) => {
  try {
    const { _id } = req.accessTokenVerify;
    const cart = await getCartsService(_id);

    if (cart) {
      successHandler(res, cart, "Cart already exists", 200);
    } else {
      successHandler(res, null, "Cart does not exist", 200);
    }
  } catch (error) {
    errorHandler(res, "Bad Request !", 400, error.message);
  }
};

module.exports = {
  createCart,
  getCarts,
};
