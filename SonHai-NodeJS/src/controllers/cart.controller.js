const { writeFileJson } = require("../services/service");
const path = require("path");

const pathFileJson = path.join(__dirname, "../db/db.json");

const getCart = async (req, res) => {
  try {
    res.status(200).json(req.items);
  } catch (error) {
    console.log(error);
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
      const item = {
        id: checkReqBody.id,
        quantity: req.body.quantity,
      };

      req.items.push(item);

      await writeFileJson(pathFileJson, JSON.stringify(req.data));
      const itemResponse = req.items.find((i) => i.id == item.id);
      res.status(201).json(itemResponse);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("Something went wrong");
  }
};

const removeItem = async (req, res) => {
  try {
    const index = req.items.findIndex((i) => i.id == req.params.id);

    if (index == -1) {
      res.status(404).json("San pham khong ton tai trong gio hang");
      return;
    } else {
      const item = req.items[index];

      req.items.splice(index, 1);

      await writeFileJson(pathFileJson, JSON.stringify(req.data));
      res.status(200).json(item);
    }
  } catch (error) {
    res.status(400).json("Something went wrong");
  }
};

const updateItem = async (req, res) => {
  try {
    const index = req.items.findIndex((i) => i.id == req.body.id);
    if (index == -1) {
      res.status(404).json("San pham khong ton tai trong gio hang");
      return;
    } else {
      if (typeof req.body.quantity == "number") {
        req.items[index].quantity = req.body.quantity;
        await writeFileJson(pathFileJson, JSON.stringify(req.data));
        res.status(200).json(req.items[index]);
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
