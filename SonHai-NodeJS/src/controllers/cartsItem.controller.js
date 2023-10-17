const {
  getCartItemOfUserLoggedInService,
  addToCartService,
  removeItemService,
  updateItemService,
  createCartsItemService,
} = require("../services/cartsItem.service");
const { getProductsService } = require("../services/products.service");

const {
  writeFileJson,
  findInData,
  findIndexInData,
  getData,
} = require("../services/service");
const { dataUpdate } = require("../services/updateNewData");

const path = require("path");

const pathFileJson = path.join(__dirname, "../db/db.json");

const createCartsItem = async (req, res) => {
  try {
    const { idUser } = req.accessToken;
    const data = await getData();
    const cartItem = await createCartsItemService(data, idUser);
    const newData = await dataUpdate(cartItem, "cartsItem");
    await writeFileJson(pathFileJson, JSON.stringify(newData));
    res.status(200).json("Create a successful cart item");
  } catch (error) {
    res.status(400).json("Something went wrong");
  }
};

const getCartsItem = async (req, res) => {
  try {
    const items = getCartItemOfUserLoggedInService(req.cartItemOfUserLoggedIn);
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json("Something went wrong");
  }
};

const addToCart = async (req, res) => {
  try {
    const { id, quantity } = req.body;
    const products = await getProductsService();
    const items = getCartItemOfUserLoggedInService(req.cartItemOfUserLoggedIn);
    const checkReqBody = await findInData(products, "id", id);
    const cartItem = req.cartItemOfUserLoggedIn;

    if (checkReqBody == undefined) {
      res.status(404).json("San pham khong ton tai trong kho");
      return;
    } else {
      const addToCartServiceData =await addToCartService(
        checkReqBody,
        quantity,
        cartItem
      );
      const { data, item } = addToCartServiceData;
      await writeFileJson(pathFileJson, JSON.stringify(data));

      const itemResponse = await findInData(items, "id", item.id);

      res.status(201).json(itemResponse);
    }
  } catch (error) {
    res.status(400).json("Something went wrong");
  }
};

const removeItem = async (req, res) => {
  try {
    const { id } = req.params;
    const items = await getCartItemOfUserLoggedInService(
      req.cartItemOfUserLoggedIn
    );
    const index = findIndexInData(items, "id", id);
    const cartItem = req.cartItemOfUserLoggedIn;

    if (index == -1) {
      res.status(404).json("San pham khong ton tai trong gio hang");
      return;
    } else {
      const removeItemServiceData = await removeItemService(index, cartItem);
      const { data, item } = removeItemServiceData;
      await writeFileJson(pathFileJson, JSON.stringify(data));

      res.status(200).json(item);
    }
  } catch (error) {
    res.status(400).json("Something went wrong");
  }
};

const updateItem = async (req, res) => {
  try {
    const { id, quantity } = req.body;
    const items = await getCartItemOfUserLoggedInService(
      req.cartItemOfUserLoggedIn
    );
    const cartItem = req.cartItemOfUserLoggedIn;

    const index = await findIndexInData(items, "id", id);
    if (index == -1) {
      res.status(404).json("San pham khong ton tai trong gio hang");
      return;
    } else {
      if (typeof quantity == "number") {
        const newData = await updateItemService(index, quantity, cartItem);

        await writeFileJson(pathFileJson, JSON.stringify(newData));
        res.status(200).json(items[index]);
      } else {
        res.status(400).json("so luong nhap vao khong hop le");
        return;
      }
    }
  } catch (error) {
    res.status(400).json("Something went wrong 12");
  }
};

module.exports = {
  getCartsItem,
  addToCart,
  removeItem,
  updateItem,
  createCartsItem,
};
