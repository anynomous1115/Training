const { getData } = require("./service");

const getProductsService = async () => {
  try {
    const { products } = await getData();
    return products;
  } catch (error) {
    console.log({ message: "Something went wrong!" });
  }
};

module.exports = {
  getProductsService,
};
