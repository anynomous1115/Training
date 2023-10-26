const { getProductsService } = require("../services/products.service");

const getProducts = async (req, res) => {
  try {
    const products = await getProductsService();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, message: "Unable to get product data!" });
  }
};

module.exports = {
  getProducts,
};
