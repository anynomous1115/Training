const { success, errorHandler } = require("../helper/response");
const {
  getCartItemOfUserLoggedInService,
  addToCartService,
  removeItemService,
  updateItemService,
} = require("../services/carts-products.service");

const getCartsProducts = async (req, res) => {
  try {
    const { _id } = req.accessTokenVerify;
    const catsProductsOfUser = await getCartItemOfUserLoggedInService(_id);
    success(res, catsProductsOfUser, "Get all CartsProducts successful !", 200);
  } catch (error) {
    errorHandler(res, error.message, 500);
  }
};

const addToCart = async (req, res) => {
  try {
    const { id, quantity, currentPrice } = req.body;

    const { _id } = req.accessTokenVerify;

    const cartProduct = await addToCartService(id, quantity, currentPrice, _id);
    success(res, cartProduct, "Add to cart successfully", 201);
  } catch (error) {
    errorHandler(res, error.message, 500);
  }
};

const removeItem = async (req, res) => {
  try {
    const { productID } = req.body;
    const { _id } = req.accessTokenVerify;

    const cartProduct = await removeItemService(productID, _id);
    success(res, cartProduct, "Deleted successfully", 200);
  } catch (error) {
    console.log(error);
    errorHandler(res, error.message, 500);
  }
};

const updateItem = async (req, res) => {
  try {
    const { _id } = req.accessTokenVerify;

    const { id, quantity } = req.body;
    if (typeof quantity !== "number") {
      errorHandler(res, "The value of quantity is not correct", 400);
      return;
    }
    const cartProduct = await updateItemService(id, quantity, _id);
    success(res, cartProduct, "Updated quantity successfully", 200);
  } catch (error) {
    errorHandler(res, error.message, 500);
  }
};

module.exports = {
  getCartsProducts,
  addToCart,
  removeItem,
  updateItem,
};
