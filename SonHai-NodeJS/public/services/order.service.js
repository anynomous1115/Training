import { showSuccessToastWithAutoHide } from "../utils/toast.js";

const orderService = async () => {
  try {
    const orderResponse = await fetch(`api/pay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (orderResponse.ok) {
      window.location.href = "../payment.html";
    }
  } catch (error) {
    console.log(error);
  }
};

const getOrder = async () => {
  const getOrderResponse = await fetch(`api/pay`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const getOrder = await getOrderResponse.json();
  const { data } = getOrder;

  return data;
};

const updateOrderStatusService = async (orderID) => {
  try {
    const updateStatus = await fetch(`/api/pay/${orderID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderID,
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

export { orderService, updateOrderStatusService, getOrder };
