const express = require("express");
const {
  payment,
  statusUpdate,
  paymentGet,
} = require("../controllers/payment.controller");
const { authenToken } = require("../middlewares/authenToken");
const { checkData } = require("../middlewares/checkData");
const router = express.Router();

router.get("/", authenToken, checkData, paymentGet);

router.post("/", authenToken, checkData, payment);

router.put("/:id", authenToken, checkData, statusUpdate);

module.exports = router;
