const {
  paymentService,
  statusUpdateService,
  getOrderService,
} = require("../services/payment.service");

let paymentOrder = null;

const paymentGet = async (req, res) => {
  try {
    const order = paymentOrder;
    const { _id } = req.accessTokenVerify;

    const data = await getOrderService(order, _id);
    res.status(200).json({
      status: 200,
      message: "Get all order successful !",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Error has occurred" });
  }
};

const payment = async (req, res) => {
  try {
    const { _id } = req.accessTokenVerify;

    const order = await paymentService(_id);
    paymentOrder = order;

    res.status(200).json({ status: 200, message: "Create order successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Error has occurred" });
  }
};
const statusUpdate = async (req, res) => {
  try {
    const { orderID } = req.body;
    const { _id } = req.accessTokenVerify;
    await statusUpdateService(orderID, _id);
    res.status(200).json({
      status: 200,
      message: "Payment successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error has occurred",
    });
  }
};

module.exports = { payment, statusUpdate, paymentGet };
