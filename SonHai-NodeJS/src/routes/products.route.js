const express = require("express");
const {
  getProducts,
  searchProduct,
} = require("../controllers/products.controller");
const {
  getAllColor,
  createColor,
  updateColor,
  deleteColor,
  getOneColor,
  getProductOnPage,
} = require("../controllers/demo.controller");
const router = express.Router();

// router.get("/", getProducts);
router.get("/search", searchProduct);
// demo restful API

router.get("/:id/color", getAllColor);
router.get("/:id/color/:id",getOneColor)
router.post("/:id/color", createColor);
router.put("/:id/color/:id", updateColor);
router.delete("/:id/color/:id", deleteColor);
router.get("/",getProductOnPage)

module.exports = router;
