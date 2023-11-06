const { success, errorHandler } = require("../helper/response");
const {
  createOrderService,
  updateOrderService,
} = require("../services/orders.service");

const createOrders = async (req, res) => {
  try {
    const { _id } = req.accessTokenVerify;

    const order = await createOrderService(_id);

    success(res, order, "Create order successfully", 201);
  } catch (error) {
    errorHandler(res, error.message, 500);
  }
};

const updateOrders = async (req, res) => {
  try {
    const { orderID } = req.body;
    const { _id } = req.accessTokenVerify;
    const order = await updateOrderService(orderID, _id);
    success(res, order, "Payment successfully", 201);
  } catch (error) {
    errorHandler(res, error.message, 500);
  }
};

module.exports = {
  createOrders,
  updateOrders,
};
