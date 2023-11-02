const { errorHandler } = require("../helper/handleError");
const { success } = require("../helper/success");
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
    success("Get all CartsProducts successful !", 200, res, catsProductsOfUser);
  } catch (error) {
    errorHandler(error, res, 500);
  }
};

const addToCart = async (req, res) => {
  try {
    const { id, quantity, currentPrice } = req.body;

    const { _id } = req.accessTokenVerify;

    const itemCart = await addToCartService(id, quantity, currentPrice, _id);
    success("Add to cart successfully", 201, res, itemCart);
  } catch (error) {
    errorHandler(error, res, 500);
  }
};

const removeItem = async (req, res) => {
  try {
    const { productID } = req.params;
    const { _id } = req.accessTokenVerify;

    const cartProduct = await removeItemService(productID, _id);
    success("Deleted successfully", 200, res, cartProduct);
  } catch (error) {
    console.log(error);
    errorHandler(error, res, 500);
  }
};

const updateItem = async (req, res) => {
  try {
    const { _id } = req.accessTokenVerify;

    const { id, quantity } = req.body;
    if (typeof quantity !== "number") {
      res
        .status(400)
        .json({ code: 400, message: "The value of quantity is not correct" });
      return;
    }
    const item = await updateItemService(id, quantity, _id);
    success("Updated quantity successfully", 200, res, item);
  } catch (error) {
    errorHandler(error, res, 500);
  }
};

module.exports = {
  getCartsProducts,
  addToCart,
  removeItem,
  updateItem,
};
