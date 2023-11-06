const { success, errorHandler } = require("../helper/response");
const {
  getOrdersDetailService,
  createOrdersDetailService,
} = require("../services/ordersDetail.service");

const getOrderDetail = async (req, res) => {
  try {
    const order = req.cookies.order;
    const { _id } = req.accessTokenVerify;
    const orderDetail = await getOrdersDetailService(order, _id);
    success(res, orderDetail, "Get all ordersDetail successful !", 200);
  } catch (error) {
    errorHandler(res, error.message, 500);
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
    success(res, orderDetail, "Create orderDetail successful !", 200);
  } catch (error) {
    errorHandler(res, error.message, 500);
  }
};

module.exports = {
  getOrderDetail,
  createOrdersDetail,
};
