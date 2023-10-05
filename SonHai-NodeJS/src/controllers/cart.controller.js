const { writeFileJson } = require("../services/service");
const path = require("path");

const pathFileJson = path.join(__dirname, "../db/db.json");

const getCart = async (req, res) => {
  try {
    const cart = await req.dataCarts.find((i) => i.idUser == req.idUser);
    res.status(200).json(cart.cartItem);
  } catch (error) {
    res.status(400).json("Something went wrong");
  }
};

const addToCart = async (req, res) => {
  try {
    const checkReqBody = req.dataProducts.find((i) => i.id == req.body.id);
    if (checkReqBody == undefined) {
      res.status(404).json("San pham khong ton tai trong kho");
      return;
    } else {
      const itemCarts = {
        id: checkReqBody.id,
        quantity: req.body.quantity,
      };
      const cart = await req.dataCarts.find((i) => i.idUser == req.idUser);
      cart.cartItem.push(itemCarts);
      await writeFileJson(pathFileJson, JSON.stringify(req.data));
      const itemResponse = cart.cartItem.find((i) => i.id == itemCarts.id);
      res.status(201).json(itemResponse);
    }
  } catch (error) {
    res.status(400).json("Something went wrong");
  }
};

const removeItem = async (req, res) => {
  try {
    const cart = await req.dataCarts.find((i) => i.idUser == req.idUser);
    const index = cart.cartItem.findIndex((i) => i.id == req.params.id);

    if (index == -1) {
      res.status(404).json("San pham khong ton tai trong gio hang");
      return;
    } else {
      const itemCarts = cart.cartItem[index];

      console.log(req.dataCarts);
      cart.cartItem.splice(index, 1);
      await writeFileJson(pathFileJson, JSON.stringify(req.data));
      res.status(200).json(itemCarts);
    }
  } catch (error) {
    res.status(400).json("Something went wrong");
  }
};

const updateItem = async (req, res) => {
  try {
    const cart = await req.dataCarts.find((i) => i.idUser == req.idUser);
    const index = cart.cartItem.findIndex((i) => i.id == req.body.id);
    if (index == -1) {
      res.status(404).json("San pham khong ton tai trong gio hang");
      return;
    } else {
      if (typeof req.body.quantity == "number") {
        cart.cartItem[index].quantity = req.body.quantity;
        await writeFileJson(pathFileJson, JSON.stringify(req.data));
        res.status(200).json(cart.cartItem[index]);
      } else {
        res.status(400).json("so luong nhap vao khong hop le");
        return;
      }
    }
  } catch (error) {
    res.status(400).json("Something went wrong");
  }
};

module.exports = {
  getCart,
  addToCart,
  removeItem,
  updateItem,
};
