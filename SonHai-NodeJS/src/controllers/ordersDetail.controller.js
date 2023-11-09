const { successHandler, errorHandler } = require("../helper/response");
const {
  getOrdersDetailService,
  createOrdersDetailService,
} = require("../services/ordersDetail.service");

const getOrderDetail = async (req, res) => {
  try {
    const order = req.cookies.order;
    const { _id } = req.accessTokenVerify;
    const orderDetail = await getOrdersDetailService(order, _id);
    successHandler(res, orderDetail, "Get all ordersDetail successful !", 200);
  } catch (error) {
    errorHandler(res, "Bad Request !", 400, error.message);
  }
};

const createOrdersDetail = async (req, res) => {
  try {
    const { _id } = req.accessTokenVerify;
    const { order } = req.body;
    const orderDetail = await createOrdersDetailService(order, _id);
    res.cookie("order", order, {
      httpOnly: true,
      maxAge: 3600 * 1000,
    });
    successHandler(res, orderDetail, "Create orderDetail successful !", 200);
  } catch (error) {
    errorHandler(res, "Bad Request !", 400, error.message);
  }
};

module.exports = {
  getOrderDetail,
  createOrdersDetail,
};
