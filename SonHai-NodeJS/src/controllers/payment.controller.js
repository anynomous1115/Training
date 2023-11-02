const { errorHandler } = require("../helper/handleError");
const { success } = require("../helper/success");
const {
  createPaymentService,
  statusUpdatePayService,
  getPaymentService,
} = require("../services/payment.service");

let paymentOrder = null;

const paymentGet = async (req, res) => {
  try {
    const order = paymentOrder;
    const { _id } = req.accessTokenVerify;

    const data = await getPaymentService(order, _id);
    success("Get all order successful !", 200, res, data);
  } catch (error) {
    errorHandler(error, res, 500);
  }
};

const paymentCreate = async (req, res) => {
  try {
    const { _id } = req.accessTokenVerify;

    const order = await createPaymentService(_id);
    paymentOrder = order;

    success("Create order successfully", 200, res);
  } catch (error) {
    errorHandler(error, res, 500);
  }
};
const statusUpdatePay = async (req, res) => {
  try {
    const { orderID } = req.body;
    const { _id } = req.accessTokenVerify;
    await statusUpdatePayService(orderID, _id);
    success("Payment successfully", 200, res);
  } catch (error) {
    errorHandler(error, res, 500);
  }
};

module.exports = { paymentCreate, statusUpdatePay, paymentGet };
