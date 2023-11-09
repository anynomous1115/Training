const express = require("express");
const router = express.Router();

const cartsRoute = require("./carts.route");
const productsRoute = require("./products.route");
const cartsProductsRoute = require("./carts-products.route");
const usersRoute = require("./users.route");
const ordersRoute = require("./orders.route")
const ordersDetailRoute = require("./ordersDetail.route")

router.use("/carts", cartsRoute);
router.use("/products", productsRoute);
router.use("/carts-products", cartsProductsRoute);
router.use("/auth", usersRoute);
router.use("/orders",ordersRoute)
router.use("/ordersDetail",ordersDetailRoute)


module.exports = router;
