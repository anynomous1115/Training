const express = require("express");
const {addToCart, getCart, removeItem, updateItem} = require("../controllers/cart.controller");
const { getProducts } = require("../controllers/product.controller");
const { checkData } = require("../middlewares/checkData");
const { registerApi, loginApi, logoutApi } = require("../controllers/users.controller");
const { checkEmail, checkPassword } = require("../middlewares/checkEmailAndPass");

const router = express.Router();

router.get("/products", checkData, getProducts);

router.get("/carts", checkData, getCart);

router.post("/carts", checkData, addToCart);

router.delete("/carts/:id", checkData, removeItem);

router.put("/carts/:id", checkData, updateItem);

router.post("/registerApi", checkEmail, checkPassword, checkData, registerApi);

router.post("/loginApi", checkEmail, checkData, loginApi);

router.post("/logoutApi", logoutApi);


module.exports = router;
