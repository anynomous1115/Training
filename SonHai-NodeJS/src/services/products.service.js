const Product = require("../models/products.model");

const getProductsService = async (name, page, perPage) => {
  if (name) {
    const regex = new RegExp(name, "i");
    const products = await Product.find({ productName: regex });
    if (products.length === 0) {
      throw new Error("No matching results were found");
    }
    return products;
  } else {
    const products = await Product.find();
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const productsOnPage = products.slice(startIndex, endIndex);
    return productsOnPage;
  }
};


module.exports = {
  getProductsService,
};
