const path = require("path");

const {
  getCartsService,
  createCartService,
} = require("../services/carts.service");

const createCart = async (req, res) => {
  try {
    const { _id } = req.accessTokenVerify;
    await createCartService(_id);
    res.status(200).json({ status: 200, message: "Create a successful cart!" });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Unable to create cart!",
    });
  }
};

const getCarts = async (req, res) => {
  try {
    const { _id } = req.accessTokenVerify;
    const cart = await getCartsService(_id);

    if (cart) {
      res.status(200).json({
        status: 200,
        cart: cart,
      });
    } else {
      res.status(200).json({
        status: 200,
        cart: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to retrieve cart data!",
    });
  }
};

module.exports = {
  createCart,
  getCarts,
};
