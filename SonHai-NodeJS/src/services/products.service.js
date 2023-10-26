const Product = require("../models/products.model");

const getProductsService = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    console.log({ message: "Something went wrong!" });
  }
};

module.exports = {
  getProductsService,
};
