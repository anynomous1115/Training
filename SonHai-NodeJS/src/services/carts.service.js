const { v4: uuidv4 } = require("uuid");

const { getData } = require("./service");

const getCartsService = async () => {
  const data = await getData();
  const { carts } = data;
  return carts;
};

const createCartService = async (idUser) => {
  const cart = {
    idUser: idUser,
    cartsItemId: uuidv4(),
  };
  return cart;
};
module.exports = {
  getCartsService,
  createCartService,
};
