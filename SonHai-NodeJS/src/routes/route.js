const express = require("express");
const {
  addToCart,
  getCart,
  removeItem,
  updateItem,
} = require("../controllers/cart.controller");
const { getProducts } = require("../controllers/product.controller");
const { checkData } = require("../middlewares/checkData");
const {
  registerApi,
  loginApi,
  logoutApi,
  checkUserLogin,
} = require("../controllers/users.controller");
const {
  checkEmail,
  checkPassword,
} = require("../middlewares/checkEmailAndPass");
const { authenToken } = require("../middlewares/authenToken");
const { findCartItem } = require("../middlewares/findCartItem");

const router = express.Router();

router.get("/products", checkData, getProducts);

router.get("/carts", checkData, authenToken, findCartItem, getCart);

router.post("/carts", checkData, authenToken, findCartItem, addToCart);

router.delete("/carts/:id", checkData, authenToken, findCartItem, removeItem);

router.put("/carts/:id", checkData, authenToken, findCartItem, updateItem);

router.post("/registerApi", checkEmail, checkPassword, checkData, registerApi);

router.post("/loginApi", checkEmail, checkData, loginApi);

router.post("/logoutApi", authenToken, logoutApi);

router.get("/user", checkData, authenToken, checkUserLogin);

module.exports = router;
