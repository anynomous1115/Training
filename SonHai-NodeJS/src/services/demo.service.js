const Color = require("../models/colors.model");
const Product = require("../models/products.model");

const getAllColorService = async (productID) => {
  const colors = await Color.find({ productID: productID });
  return colors;
};

const getOneColorService = async (colorID) => {
  const color = await Color.findOne({ _id: colorID });
  return color;
};

const createColorService = async (colorName, productID) => {
  const colors = await Color.find({
    productID: productID,
    colorName: colorName,
  });
  if (colors.length !== 0) {
    throw new Error("This color already exists");
  }
  const colorNew = await Color.create({
    productID: productID,
    colorName: colorName,
  });
  return colorNew;
};

const updateColorService = async (colorID, newColorName) => {
  const color = await Color.findOne({ _id: colorID });
  color.colorName = newColorName;
  return await color.save();
};

const deleteColorService = async (id) => {
  const color = await Color.findByIdAndDelete({ _id: id });
  return color;
};

const getProductOnPageService = async (page, perPage) => {
  const products = await Product.find();
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const productsOnPage = products.slice(start, end);
  return productsOnPage;
};
module.exports = {
  getAllColorService,
  createColorService,
  updateColorService,
  deleteColorService,
  getOneColorService,
  getProductOnPageService,
};
