import {
  getOrdersDetail,
  updateOrderStatusService,
} from "../services/order.service.js";

const updateOrderStatus = (orderID) => {
  const paying = document.querySelector("#paying");
  paying.addEventListener("click", async (e) => {
    await updateOrderStatusService(orderID);
  });
};

const showOrder = async () => {
  const { orderDetail, products, email, order } = await getOrdersDetail();
  const paymentItemDOM = document.querySelector(".payment-item-wrap");

  const deliveryAddress = document.querySelector(
    ".payment-wrap-delivery-address"
  );
  deliveryAddress.innerHTML = `
  <div class="delivery-address-title">
                            <i class="fa-solid fa-location-dot"></i>
                            <h3>Địa Chỉ Nhận Hàng</h3>
                        </div>
                        <div class="delivery-address-infor">
                            <span>${email}</span>
                        </div>
  `;

  const mapOrderDetail = orderDetail.map((item) => {
    const product = products.find((i) => i._id == item.productID);
    if (product) {
      return {
        ...product,
        ...item,
      };
    }
  });

  const result = mapOrderDetail.map((value) => {
    return `
    <div class="payment-item">
    <div class="product-infor">
        <img src="${value.image}" alt="">
        <span>${value.productName}</span>
    </div>
    <div class="product-description">
        <span>${value.currentPrice}</span>
        <span>${value.quantity}</span>
        <span>${value.subTotal}</span>
    </div>
    </div>
    <div class="lines"></div>
    `;
  });
  paymentItemDOM.innerHTML = result.join(" ");
  console.log(orderDetail);
  updateOrderStatus(order._id);
};

showOrder();
