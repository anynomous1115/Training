const express = require("express");
const { authenToken } = require("../middlewares/authenToken");
const {
  addToCart,
  removeItem,
  updateItem,
} = require("../controllers/carts-products.controller");
const router = express.Router();

router.post("/", authenToken, addToCart);

router.delete("/:id", authenToken, removeItem);

router.put("/:id", authenToken, updateItem);

module.exports = router;
