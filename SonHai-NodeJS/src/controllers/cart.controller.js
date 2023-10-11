const {
  writeFileJson,
  findInData,
  findIndexInData,
} = require("../services/service");
const path = require("path");

//moi thu ve req.item can trong
const pathFileJson = path.join(__dirname, "../db/db.json");

const getCart = async (req, res) => {
  const { items } = req.cartItemOfUserLoggedIn;
  try {
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json("Something went wrong");
  }
};

const addToCart = async (req, res) => {
  const { products } = req.data;
  const { id, quantity } = req.body;
  const { items } = req.cartItemOfUserLoggedIn;

  try {
    const checkReqBody = await findInData(products, "id", id);
    if (checkReqBody == undefined) {
      res.status(404).json("San pham khong ton tai trong kho");
      return;
    } else {
      const item = {
        id: checkReqBody.id,
        quantity: quantity,
      };

      items.push(item);

      await writeFileJson(pathFileJson, JSON.stringify(req.data));
      const itemResponse = await findInData(items, "id", item.id);
      res.status(201).json(itemResponse);
    }
  } catch (error) {
    res.status(400).json("Something went wrong");
  }
};

const removeItem = async (req, res) => {
  const { items } = req.cartItemOfUserLoggedIn;
  const { id } = req.params;
  try {
    const index = findIndexInData(items, "id", id);

    if (index == -1) {
      res.status(404).json("San pham khong ton tai trong gio hang");
      return;
    } else {
      const item = items[index];

      items.splice(index, 1);

      await writeFileJson(pathFileJson, JSON.stringify(req.data));
      res.status(200).json(item);
    }
  } catch (error) {
    res.status(400).json("Something went wrong");
  }
};

const updateItem = async (req, res) => {
  const { items } = req.cartItemOfUserLoggedIn;
  const { id, quantity } = req.body;
  try {
    const index = findIndexInData(items, "id", id);
    if (index == -1) {
      res.status(404).json("San pham khong ton tai trong gio hang");
      return;
    } else {
      if (typeof quantity == "number") {
        items[index].quantity = quantity;
        await writeFileJson(pathFileJson, JSON.stringify(req.data));
        res.status(200).json(items[index]);
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
