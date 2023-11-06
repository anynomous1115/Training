const express = require("express");
const { authenToken } = require("../middlewares/authenToken");
const {
  getOrderDetail,
  createOrdersDetail,
} = require("../controllers/ordersDetail.controller");
const router = express.Router();

router.get("/", authenToken, getOrderDetail);
router.post("/", authenToken, createOrdersDetail);

module.exports = router;
