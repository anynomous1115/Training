const { errorHandler } = require("../helper/handleError");
const { success } = require("../helper/success");
const { getProductsService } = require("../services/products.service");

const getProducts = async (req, res) => {
  try {
    const products = await getProductsService();
    success("Get all product successful !", 200,res, products);
  } catch (error) {
    errorHandler(error, res, 500);
  }
};

module.exports = {
  getProducts,
};
