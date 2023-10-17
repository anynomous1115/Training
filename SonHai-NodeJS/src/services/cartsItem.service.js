const { getData, findInData } = require("./service");

const getCartsItemService = async () => {
  try {
    const data = await getData();
    const { cartsItem } = data;
    return cartsItem;
  } catch (error) {
    console.log({ message: "Something went wrong!" });
  }
};

const getCartItemOfUserLoggedInService = (cartItemOfUserLoggedIn) => {
  try {
    const { items } = cartItemOfUserLoggedIn;
    return items;
  } catch (error) {
    console.log({ message: "Something went wrong! cartsItem" });
  }
};

const addToCartService = async (checkReqBody, quantity, cartItem) => {
  try {
    const data = await getData();
    const { cartsItem } = data;
    const cartItemOfUser = await findInData(
      cartsItem,
      "cartsItemId",
      cartItem.cartsItemId
    );

    const { id } = checkReqBody;

    const item = {
      id: id,
      quantity: quantity,
    };
    const { items } = cartItemOfUser;

    items.push(item);
    return { data, item };
  } catch (error) {
    console.log({ message: "Something went wrong!" });
  }
};

const removeItemService = async (index, cartItem) => {
  try {
    const data = await getData();
    const { cartsItem } = data;
    const cartItemOfUser = await findInData(
      cartsItem,
      "cartsItemId",
      cartItem.cartsItemId
    );
    const { items } = cartItemOfUser;
    const item = items[index];

    items.splice(index, 1);

    return { data, item };
  } catch (error) {
    console.log({ message: "Something went wrong!" });
  }
};

const updateItemService = async (index, quantity, cartItem) => {
  try {
    const data = await getData();
    const { cartsItem } = data;

    const cartItemOfUser = await findInData(
      cartsItem,
      "cartsItemId",
      cartItem.cartsItemId
    );
    const { items } = cartItemOfUser;
    items[index].quantity = quantity;

    return data;
  } catch (error) {
    console.log({ message: "Something went wrong!" });
  }
};

const createCartsItemService = async (data, idUser) => {
  const { carts } = data;
  const cart = await findInData(carts, "idUser", idUser);
  const cartItem = {
    cartsItemId: cart.cartsItemId,
    items: [],
  };
  return cartItem;
};

module.exports = {
  getCartItemOfUserLoggedInService,
  addToCartService,
  removeItemService,
  updateItemService,
  getCartsItemService,
  createCartsItemService,
};
