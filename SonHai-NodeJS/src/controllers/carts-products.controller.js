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
    res.status(200).json(catsProductsOfUser);
  } catch (error) {
    res.status(400).json({ status: 500, message: error.message ||"Cannot get user's cart!" });
  }
};

const addToCart = async (req, res) => {
  try {
    const { id, quantity, currentPrice } = req.body;

    const { _id } = req.accessTokenVerify;

    const itemCart = await addToCartService(id, quantity, currentPrice, _id);
    res.status(201).json(itemCart);
  } catch (error) {
    res
      .status(500)
      .json({
        status: 500,
        message: error.message || "Cannot add to cart",
      });
  }
};

const removeItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.accessTokenVerify;

    const cartProduct = await removeItemService(id, _id);
    res.status(200).json(cartProduct);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message ||"Cannot delete cart item!" });
  }
};

const updateItem = async (req, res) => {
  try {
    const { _id } = req.accessTokenVerify;

    const { id, quantity } = req.body;
    if (typeof quantity !== "number") {
      res
        .status(400)
        .json({ status: 400, message: "The value of quantity is not correct" });
      return;
    }
    const product = await updateItemService(id, quantity, _id);

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 500, message: error.message ||"Unable to update item quantity!" });
  }
};

module.exports = {
  getCartsProducts,
  addToCart,
  removeItem,
  updateItem,
};
