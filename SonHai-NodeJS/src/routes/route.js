const express = require("express");
const {
  addToCart,
  getCartsItem,
  removeItem,
  updateItem,
  createCartsItem,
} = require("../controllers/cartsItem.controller");
const { getProducts } = require("../controllers/products.controller");
const { checkData } = require("../middlewares/checkData");
const {
  register,
  login,
  logout,
  checkUserLogin,
} = require("../controllers/users.controller");
const { authenToken } = require("../middlewares/authenToken");
const { findCartItem } = require("../middlewares/findCartItem");
const { validBodyData } = require("../middlewares/validBodyData");
const { createCart, getCarts } = require("../controllers/cart.controller");

const router = express.Router();

const registerSchema = {
  email: {
    type: "string",
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: "string",
    regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=])[A-Za-z\d@#$%^&+=]{8,}$/,
  },
};

const fieldCheckRegister = ["email", "password"];
const fieldCheckLogin = ["email"];

router.get("/products", checkData, getProducts);

router.get("/carts", authenToken, checkData, getCarts);

router.post("/carts", authenToken, checkData, createCart);

router.get("/carts-item", authenToken, checkData, findCartItem, getCartsItem);

router.post(
  "/carts-item",
  authenToken,
  checkData,
  findCartItem,
  createCartsItem
);

router.post(
  "/carts-item/add-to-cart",
  authenToken,
  checkData,
  findCartItem,
  addToCart
);

router.delete(
  "/carts-item/:id",
  authenToken,
  checkData,
  findCartItem,
  removeItem
);

router.put("/carts-item/:id", authenToken, checkData, findCartItem, updateItem);

router.post(
  "/register",
  validBodyData(registerSchema, fieldCheckRegister),
  checkData,
  register
);

router.post(
  "/login",
  validBodyData(registerSchema, fieldCheckLogin),
  checkData,
  login
);

router.post("/logout", authenToken, logout);

router.get("/user", authenToken, checkData, checkUserLogin);

module.exports = router;
