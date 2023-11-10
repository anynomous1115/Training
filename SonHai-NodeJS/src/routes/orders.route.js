const express = require("express");
const { authenToken } = require("../middlewares/authenToken");
const {
  createOrders,
  updateOrders,
} = require("../controllers/orders.controller");
const { getOrderDetail } = require("../controllers/ordersDetail.controller");

const router = express.Router();

router.post("/", authenToken, createOrders);
router.put("/:id", authenToken, updateOrders);
router.get("/:id/products",authenToken,getOrderDetail)

module.exports = router;
