const { getProductsService } = require("../services/products.service");

const getProducts = async (req, res) => {
  const products = await getProductsService();
  try {
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: "coa loi xay ra" });
  }
};

module.exports = {
  getProducts,
};
