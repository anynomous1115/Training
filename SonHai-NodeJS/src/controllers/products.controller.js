const { success, errorHandler } = require("../helper/response");
const { getProductsService } = require("../services/products.service");

const getProducts = async (req, res) => {
  try {
    const products = await getProductsService();
    success(res, products, "Get all product successful !");
  } catch (error) {
    errorHandler(res, error.message, 500);
  }
};

module.exports = {
  getProducts,
};
