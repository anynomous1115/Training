const express = require('express');
const { addToCart, getCart, removeItem, updateItem } = require('../controllers/cart.controller');
const { getProducts } = require('../controllers/product.controller');

const router = express.Router();

router.get("/products",getProducts);

router.get("/carts",getCart);

router.post("/carts",addToCart)

router.delete("/carts/:id",removeItem)

router.put("/carts/:id",updateItem)

router.post("/login")

module.exports = router