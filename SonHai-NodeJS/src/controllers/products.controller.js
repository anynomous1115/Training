const { successHandler, errorHandler } = require("../helper/response");
const {
  getProductsService,
  searchProductService,
} = require("../services/products.service");

const getProducts = async (req, res) => {
  try {
    const products = await getProductsService();
    successHandler(res, products, "Get all product successful !");
  } catch (error) {
    errorHandler(res, "Bad Request !", 400, error.message);
  }
};

const searchProduct = async (req, res) => {
  try {
    const name = req.query.name;
    const products = await searchProductService(name);
    successHandler(res, products, "Search all product successful !", 200);
  } catch (error) {
    errorHandler(res, "Bad Request !", 400, error.message);
  }
};

module.exports = {
  getProducts,
  searchProduct,
};
