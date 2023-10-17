const { getCartsService } = require("../services/carts.service");
const {
  getCartsItemService,
} = require("../services/cartsItem.service");
const { findInData } = require("../services/service");

const findCartItem = async (req, res, next) => {
  try {
    const { idUser } = req.accessToken;
    const carts = await getCartsService();
    const cartsItem = await getCartsItemService();
    const cart = await findInData(carts, "idUser", idUser);

    const cartItem = await findInData(
      cartsItem,
      "cartsItemId",
      cart.cartsItemId
    );
    req.cartItemOfUserLoggedIn = cartItem;

    next();
  } catch (error) {
    res.status(400).json({ message: "Something went wrong!" });
  }
};

module.exports = {
  findCartItem,
};
