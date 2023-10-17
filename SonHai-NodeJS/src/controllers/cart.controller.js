const path = require("path");

const {
  getCartsService,
  createCartService,
} = require("../services/carts.service");
const { findInData, writeFileJson } = require("../services/service");
const { dataUpdate } = require("../services/updateNewData");

const pathFileJson = path.join(__dirname, "../db/db.json");

const createCart = async (req, res) => {
  try {
    const { idUser } = req.accessToken;
    const cart = await createCartService(idUser);
    const newData = await dataUpdate(cart, "carts");

    await writeFileJson(pathFileJson, JSON.stringify(newData));
    res.status(200).json({ message: "Create a successful cart" });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

const getCarts = async (req, res) => {
  try {
    const { idUser } = req.accessToken;
    const carts = await getCartsService();
    const cart = await findInData(carts, "idUser", idUser);

    if (cart) {
      res.status(200).json({ message: "already have cart" });
    } else {
      res.status(201).json({ message: "no cart yet" });
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createCart,
  getCarts,
};
