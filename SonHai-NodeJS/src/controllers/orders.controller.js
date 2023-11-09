const { successHandler, errorHandler } = require("../helper/response");
const {
  createOrderService,
  updateOrderService,
} = require("../services/orders.service");

const createOrders = async (req, res) => {
  try {
    const { _id } = req.accessTokenVerify;

    const order = await createOrderService(_id);

    successHandler(res, order, "Create order successfully", 201);
  } catch (error) {
    errorHandler(res, "Bad Request !", 400, error.message);
  }
};

const updateOrders = async (req, res) => {
  try {
    const { orderID } = req.body;
    const { _id } = req.accessTokenVerify;
    const order = await updateOrderService(orderID, _id);
    successHandler(res, order, "Payment successfully", 201);
  } catch (error) {
    errorHandler(res, "Bad Request !", 400, error.message);
  }
};

module.exports = {
  createOrders,
  updateOrders,
};
