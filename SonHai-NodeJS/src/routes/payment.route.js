const express = require("express");
const {
  paymentCreate,
  statusUpdatePay,
  paymentGet,
} = require("../controllers/payment.controller");
const { authenToken } = require("../middlewares/authenToken");
const router = express.Router();

router.get("/", authenToken, paymentGet);

router.post("/", authenToken, paymentCreate);

router.put("/:id", authenToken, statusUpdatePay);

module.exports = router;
