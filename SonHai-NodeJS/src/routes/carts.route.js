const express = require("express");
const { authenToken } = require("../middlewares/authenToken");
const { getCarts, createCart } = require("../controllers/carts.controller");
const router = express.Router();

router.get("/", authenToken, getCarts);

router.post("/", authenToken, createCart);

module.exports = router;
