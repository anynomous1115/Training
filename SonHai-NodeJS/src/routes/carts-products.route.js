const express = require("express");
const { authenToken } = require("../middlewares/authenToken");
const {
  getCartsProducts,
  addToCart,
  removeItem,
  updateItem,
} = require("../controllers/carts-products.controller");
const router = express.Router();

router.get("/", authenToken, getCartsProducts);

router.post("/:productID", authenToken, addToCart);

router.delete("/:productID", authenToken, removeItem);

router.put("/:productID", authenToken, updateItem);

module.exports = router;
