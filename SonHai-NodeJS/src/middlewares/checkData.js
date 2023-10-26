const { getData } = require("../services/service");

const checkData = async (req, res, next) => {
  try {
    const data = await getData();
    if (typeof data.products == "string" || typeof data.carts == "string") {
      return res
        .status(400)
        .json({ status: 400, message: "Something went wrong !" });
    }
    next();
  } catch (error) {
    res.status(500).json({ status: 500, message: "Something went wrong !" });
  }
};

module.exports = {
  checkData,
};
