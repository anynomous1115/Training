const getProducts = (req, res) => {
  const { products } = req.data;
  try {
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: "coa loi xay ra" });
  }
};

module.exports = {
  getProducts,
};
