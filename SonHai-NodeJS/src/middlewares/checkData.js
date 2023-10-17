const { getData } = require("../services/service");

const checkData = async (req, res, next) => {
  try {
    const data = await getData();
    if (typeof data.products == "string" || typeof data.carts == "string") {
      return res.status(400).json({ message: "Something went wrong ! 123" });
    }
    next();
  } catch (error) {
    res.status(400).json({ message: "Something went wrong ! 12" });
  }
};

module.exports = {
  checkData,
};
