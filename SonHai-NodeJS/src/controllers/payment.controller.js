const {
  paymentService,
  statusUpdateService,
  getOrderSevice,
} = require("../services/payment.sevice");

let paymentOrder=null

const paymentGet = async (req, res) => {
  try {
    const order = paymentOrder;
    const { _id } = req.accessTokenVerify;

    const orderDetail = await getOrderSevice(order,_id);
    res.status(200).json(orderDetail);
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

    res.status(200).json({ message: "Successfully" });
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
      message: "Payment success",
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
