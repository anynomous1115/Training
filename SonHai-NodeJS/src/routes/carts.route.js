const express = require("express");
const { authenToken } = require("../middlewares/authenToken");
const { getCarts, createCart } = require("../controllers/carts.controller");
const {
  getCartsProducts,
} = require("../controllers/carts-products.controller");
const router = express.Router();

router.get("/me", authenToken, getCarts);

router.post("/", authenToken, createCart);

router.get("/:id/products", authenToken, getCartsProducts);

module.exports = router;
