const getProducts = (req, res) => {
  try {
    res.status(200).json(req.dataProducts);
  } catch (error) {
    res.status(400).json({message:"coa loi xay ra"})
  }
};

module.exports = {
  getProducts,
};
