const { getData, findInData } = require("./service");

const updateCartsItemData = async (item, cartItem) => {
  const data = await getData();
  const { cartsItem } = data;
  const cartItemOfUser = await findInData(
    cartsItem,
    "cartsItemId",
    cartItem.cartsItemId
  );
  cartItemOfUser.items.push(item)
  return data;
};
module.exports = {
  updateCartsItemData,
};
