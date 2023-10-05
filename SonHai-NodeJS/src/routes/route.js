const express = require("express");
const {addToCart, getCart, removeItem, updateItem} = require("../controllers/cart.controller");
const { getProducts } = require("../controllers/product.controller");
const { checkData } = require("../middlewares/checkData");
const { registerApi, loginApi, logoutApi } = require("../controllers/users.controller");
const { checkEmail, checkPassword } = require("../middlewares/checkEmailAndPass");
const { authenToken } = require("../middlewares/authenToken");

const router = express.Router();

router.get("/products", checkData, getProducts);

router.get("/carts", checkData, authenToken, getCart);

router.post("/carts", checkData, authenToken, addToCart);

router.delete("/carts/:id", checkData, authenToken, removeItem);

router.put("/carts/:id", checkData, authenToken, updateItem);

router.post("/registerApi", checkEmail, checkPassword, checkData, registerApi);

router.post("/loginApi", checkEmail, checkData, loginApi);

router.post("/logoutApi",authenToken, logoutApi);


module.exports = router;
