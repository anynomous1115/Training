const Product = require("../models/products.model");

const getProductsService = async () => {
  const products = await Product.find();
  return products;
};

const searchProductService = async (name) => {
  const regex = new RegExp(name, "i");
  const products = await Product.find({ productName: regex });
  console.log(products);
  if (products.length === 0) {
    throw new Error("No matching results were found");
  }
  return products;
};

module.exports = {
  getProductsService,
  searchProductService,
};
