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
  register,
  login,
  logout,
  checkUserLogin,
} = require("../controllers/users.controller");
const { validBodyData } = require("../middlewares/checkEmailAndPass");
const { authenToken } = require("../middlewares/authenToken");
const { findCartItem } = require("../middlewares/findCartItem");

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

router.get("/carts", authenToken, checkData, findCartItem, getCart);

router.post("/carts", authenToken, checkData, findCartItem, addToCart);

router.delete("/carts/:id", authenToken, checkData, findCartItem, removeItem);

router.put("/carts/:id", authenToken, checkData, findCartItem, updateItem);

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
