const Product = require("../models/products.model");

const getProductsService = async () => {
  const products = await Product.find();
  return products;
};

module.exports = {
  getProductsService,
};
