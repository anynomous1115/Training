import { showSuccessToastWithAutoHide } from "../utils/toast.js";

const orderService = async () => {
  try {
    const orderResponse = await fetch(`api/v1/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const response = await orderResponse.json();
    const { data } = response;
    if (orderResponse.ok) {
      const createOrdersDetailRes = await fetch(`api/v1/ordersDetail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order: data,
        }),
      });
      if (createOrdersDetailRes.ok) {
        window.location.href = "../payment.html";
      }
    }
    if (response.message === "The shopping cart is empty") {
      console.log(8947473874);

      showSuccessToastWithAutoHide("Gio hang dang trong", "#db4444");
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

const getOrdersDetail = async () => {
  const getOrderResponse = await fetch(`api/v1/ordersDetail`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const getOrder = await getOrderResponse.json();
  const { data } = getOrder;

  return data;
};

const updateOrderStatusService = async (orderID) => {
  try {
    console.log(orderID);
    const updateStatus = await fetch(`/api/v1/orders/${orderID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderID: orderID,
      }),
    });
    if (updateStatus.ok) {
      showSuccessToastWithAutoHide("Thanh toan thanh cong ", "#0c8c6c");
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } else {
      showSuccessToastWithAutoHide("Thanh toan that bai ", "#db4444");
    }
  } catch (error) {
    console.log(error);
  }
};

export { orderService, updateOrderStatusService, getOrdersDetail };
