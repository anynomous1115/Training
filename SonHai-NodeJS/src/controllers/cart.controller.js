const { writeFileJson } = require("../services/service");
const path = require("path");

const pathFileJson = path.join(__dirname, "../db/db.json");

const getCart = (req, res) => {
  res.status(200).json(req.dataCarts);
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
      req.dataCarts.push(itemCarts);
      await writeFileJson(pathFileJson, JSON.stringify(req.data));
      const itemResponse = req.dataCarts.find((i) => i.id == itemCarts.id);
      res.status(201).json(itemResponse);
    }
  } catch (error) {
    res.status(400).json("Something went wrong");
  }
};

const removeItem = async (req, res) => {
  try {
    const index = req.dataCarts.findIndex((i) => i.id == req.params.id);
    if (index == -1) {
      res.status(404).json("San pham khong ton tai trong gio hang");
      return;
    } else {
      const itemCarts = req.dataCarts[index];
      req.dataCarts.splice(index, 1);
      await writeFileJson(pathFileJson, JSON.stringify(req.data));
      res.status(200).json(itemCarts);
    }
  } catch (error) {
    res.status(400).json("Something went wrong");
  }
};

const updateItem = async (req, res) => {
  try {
    const index = req.dataCarts.findIndex((i) => i.id == req.body.id);
    if (index == -1) {
      res.status(404).json("San pham khong ton tai trong gio hang");
      return;
    } else {
      if (typeof req.body.quantity == "number") {
        req.dataCarts[index].quantity = req.body.quantity;
        await writeFileJson(pathFileJson, JSON.stringify(req.data));
        res.status(200).json(req.dataCarts[index]);
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
