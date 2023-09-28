const getProducts = (req, res) => {
  res.status(200).json(req.dataProducts);
};

module.exports = {
  getProducts,
};
