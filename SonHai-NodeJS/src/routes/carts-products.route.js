const express = require("express");
const { authenToken } = require("../middlewares/authenToken");
const { checkData } = require("../middlewares/checkData");
const {
  getCartsProducts,
  addToCart,
  removeItem,
  updateItem,
} = require("../controllers/carts-products.controller");
const router = express.Router();

router.get("/", authenToken, checkData, getCartsProducts);

router.post(
  "/add-to-cart",
  authenToken,
  checkData,
  addToCart
);

router.delete(
  "/:id",
  authenToken,
  checkData,
  removeItem
);

router.put("/:id", authenToken, checkData, updateItem);

module.exports = router;
