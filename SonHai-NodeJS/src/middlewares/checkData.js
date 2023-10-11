const { getData } = require("../services/service");

const checkData = async (req, res, next) => {
  try {
    const data = await getData();
    if (typeof data.products == "string" || typeof data.carts == "string") {
      return res.status(400).json({ message: "Something went wrong ! 123" });
    }
    req.data = {
      products: data.products,
      carts: data.carts,
      cartsItem: data.cartsItem,
      users: data.users,
    };

    next();
  } catch (error) {
    res.status(400).json({ message: "Something went wrong ! 12" });
  }
};

module.exports = {
  checkData,
};
