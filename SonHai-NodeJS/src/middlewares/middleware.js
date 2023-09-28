const { getData } = require("../utils/getdata");

const checkData = async (req, res, next) => {
  const data = await getData(req, res);
  if (typeof data.products == "string" || typeof data.carts == "string") {
    return res.status(400).json({ message: "Something went wrong ! 123" });
  }
    next();
};
module.exports = {
  checkData,
};
