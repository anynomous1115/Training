const express = require("express");
const { getProducts } = require("../controllers/products.controller");
const { checkData } = require("../middlewares/checkData");
const router = express.Router();

router.get("/", checkData, getProducts);

module.exports = router;
