const express = require("express");
const { authenToken } = require("../middlewares/authenToken");
const { checkData } = require("../middlewares/checkData");
const { getCarts, createCart } = require("../controllers/carts.controller");
const router = express.Router();

router.get("/", authenToken, checkData, getCarts);

router.post("/", authenToken, checkData, createCart);

module.exports = router;
