const findCartItem = async (req, res, next) => {
  try {
    const cart = await req.dataCarts.find((i) => i.idUser == req.idUser);
    const cartItem = await req.dataCartItem.find(
      (i) => i.cartItemId == cart.cartItemId
    );

    req.cartItem = cartItem;
    req.items = cartItem.items;
    console.log(req.items);
    next();
  } catch (error) {
    console.log({ message: "Something went wrong!" });
  }
};

module.exports = {
  findCartItem,
};
