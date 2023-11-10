const { successHandler, errorHandler } = require("../helper/response");
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
    successHandler(
      res,
      catsProductsOfUser,
      "Get all CartsProducts successful !",
      200
    );
  } catch (error) {
    errorHandler(res, "Bad Request !", 400, error.message);
  }
};

const addToCart = async (req, res) => {
  try {
    const { productID, quantity, currentPrice } = req.body;

    const { _id } = req.accessTokenVerify;

    const cartProduct = await addToCartService(productID, quantity, currentPrice, _id);
    successHandler(res, cartProduct, "Add to cart successfully", 201);
  } catch (error) {
    errorHandler(res, "Bad Request !", 400, error.message);
  }
};

const removeItem = async (req, res) => {
  try {
    const cartProductID = req.params.id
    const cartProduct = await removeItemService(cartProductID);
    successHandler(res, cartProduct, "Deleted successfully", 200);
  } catch (error) {
    errorHandler(res, "Bad Request !", 400, error.message);
  }
};

const updateItem = async (req, res) => {
  try {
    const { cartProductID, quantity } = req.body;
    if (typeof quantity !== "number") {
      errorHandler(res, "The value of quantity is not correct", 400);
      return;
    }
    const cartProduct = await updateItemService(cartProductID, quantity,);
    successHandler(res, cartProduct, "Updated quantity successfully", 200);
  } catch (error) {
    errorHandler(res, "Bad Request !", 400, error.message);
  }
};

module.exports = {
  getCartsProducts,
  addToCart,
  removeItem,
  updateItem,
};
