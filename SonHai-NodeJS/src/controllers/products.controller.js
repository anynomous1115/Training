const { successHandler, errorHandler } = require("../helper/response");
const {
  getProductsService,
} = require("../services/products.service");

const getProducts = async (req, res) => {
  try {
    const name = req.query.name;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 5;
    const products = await getProductsService(name,page,perPage);
    successHandler(res, products, "Get product successful !");
  } catch (error) {
    errorHandler(res, "Bad Request !", 400, error.message);
  }
};


module.exports = {
  getProducts,
};
