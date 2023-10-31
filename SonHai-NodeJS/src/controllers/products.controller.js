const { getProductsService } = require("../services/products.service");

const getProducts = async (req, res) => {
  try {
    const products = await getProductsService();
    res.status(200).json({
      status: 200,
      products: products,
      message: "Get all product successful !",
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, message: "Unable to get product data!" });
  }
};

module.exports = {
  getProducts,
};
