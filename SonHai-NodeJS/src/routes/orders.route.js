const express = require("express");
const { authenToken } = require("../middlewares/authenToken");
const {
  createOrders,
  updateOrders,
} = require("../controllers/orders.controller");

const router = express.Router();

router.post("/", authenToken, createOrders);
router.put("/:id", authenToken, updateOrders);

module.exports = router;
