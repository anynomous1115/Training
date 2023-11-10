const { successHandler, errorHandler } = require("../helper/response");
const {
  getOrdersDetailService,
  createOrdersDetailService,
} = require("../services/ordersDetail.service");

const getOrderDetail = async (req, res) => {
  try {
    const orderID = req.params.id;
    const { _id } = req.accessTokenVerify;
    const orderDetail = await getOrdersDetailService(orderID, _id);
    successHandler(res, orderDetail, "Get all ordersDetail successful !", 200);
  } catch (error) {
    errorHandler(res, "Bad Request !", 400, error.message);
  }
};

const createOrdersDetail = async (req, res) => {
  try {
    const { _id } = req.accessTokenVerify;
    const { orderID } = req.body;
    const orderDetail = await createOrdersDetailService(orderID, _id);
    successHandler(res, orderDetail, "Create orderDetail successful !", 200);
  } catch (error) {
    console.log(error);
    errorHandler(res, "Bad Request !", 400, error.message);
  }
};

module.exports = {
  getOrderDetail,
  createOrdersDetail,
};
