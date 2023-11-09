const { successHandler, errorHandler } = require("../helper/response");
const {
  getAllColorService,
  createColorService,
  updateColorService,
  deleteColorService,
  getOneColorService,
  getProductOnPageService,
} = require("../services/demo.service");

const getAllColor = async (req, res) => {
  try {
    const { productID } = req.body;
    const colors = await getAllColorService(productID);
    successHandler(res, colors, "Get all color successful!", 200);
  } catch (error) {
    errorHandler(res, "Bad Request !", 400, error.message);
  }
};

const getOneColor = async (req, res) => {
  try {
    const { _id } = req.body;
    const color = await getOneColorService(_id);
    successHandler(res, color, "Get color successful!");
  } catch (error) {
    errorHandler(res, "Bad Request !", 400, error.message);
  }
};

const createColor = async (req, res) => {
  try {
    const { colorName, productID } = req.body;
    const color = await createColorService(colorName, productID);
    successHandler(res, color, "Create color successful!", 200);
  } catch (error) {
    errorHandler(res, "Bad Request !", 400, error.message);
  }
};

const updateColor = async (req, res) => {
  try {
    const { _id, newColorName } = req.body;
    const color = await updateColorService(_id, newColorName);
    successHandler(res, color, "Update color successful!", 200);
  } catch (error) {
    errorHandler(res, "Bad Request !", 400, error.message);
  }
};

const deleteColor = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const color = await deleteColorService(id);
    successHandler(res, color, "Delete color successful!", 200);
  } catch (error) {
    errorHandler(res, "Bad Request !", 400, error.message);
  }
};

const getProductOnPage = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 5;
    const productsOnPage = await getProductOnPageService(page, perPage);
    successHandler(
      res,
      productsOnPage,
      `Get all products on page ${page}, success`
    );
  } catch (error) {
    errorHandler(res, "Bad Request !", 400, error.message);
  }
};

module.exports = {
  getAllColor,
  createColor,
  updateColor,
  deleteColor,
  getOneColor,
  getProductOnPage,
};
