import { cartState, productsState } from "../ui-global-state/state.js";
import {
  updateQuantityCartItem,
  deleteCartItem,
  totalCartCalculator,
} from "../services/cart.service.js";
import { getProductById } from "../utils/findById.js";
import { orderSevice } from "../services/order.service.js";

// Tạo function openCart(true) | openCart(false)

const openCart = (isOpen) => {
  const showCartItem = document.querySelector(".show-cart");
  const cart = document.querySelector(".cart");
  const overLay = document.querySelector(".cart__overlay");

  if (isOpen) {
    showCartItem.style.display = "block";
    cart.classList.add("cart__open");
    overLay.style.display = "block";
    showCart();
  } else {
    cart.classList.remove("cart__open");
    showCartItem.style.display = "none";
    overLay.style.display = "none";
  }
};

const cartEvent = () => {
  const btnOpenCart = document.querySelector(".btnCart");
  const closeCart = document.querySelector(".close-icon");
  const overLay = document.querySelector(".cart__overlay");

  btnOpenCart.addEventListener("click", () => {
    openCart(true);
  });

  closeCart.addEventListener("click", () => {
    openCart(false);
  });

  overLay.addEventListener("click", () => {
    openCart(false);
  });
};

const updateQuantityEvent = () => {
  const quantity_left = document.querySelectorAll(".quantity-left");

  quantity_left.forEach((element) => {
    element.addEventListener("click", async () => {
      const id = element.getAttribute("data-id");
      await updateQuantityCartItem(id, -1);
      updateQuantityDOM(id);
      showTotalCard();
    });
  });

  const quantity_right = document.querySelectorAll(".quantity-right");

  quantity_right.forEach((element) => {
    element.addEventListener("click", async () => {
      const id = element.getAttribute("data-id");
      await updateQuantityCartItem(id, 1);
      updateQuantityDOM(id);
      showTotalCard();
    });
  });
};

const updateQuantityDOM = (id) => {
  const countDOM = document.querySelector(`.count[data-id="${id}"]`);
  const countValue = cartState.find((i) => i.productID == id);
  countDOM.value = countValue.quantity;
};

const deleteCartEvent = () => {
  const btn_Remove = document.querySelectorAll(".remove");
  btn_Remove.forEach((element) => {
    element.addEventListener("click", async () => {
      const id = element.getAttribute("data-id");
      await deleteCartItem(id);
      deleteCartDOM(id);
      showTotalCard();
    });
  });
};

const deleteCartDOM = (id) => {
  const cartItemDOM = document.querySelector(`.cart-item[data-id="${id}"]`);
  cartItemDOM.remove(`.cart-item[data-id="${id}"]`);
};

const inputChangeEvent = () => {
  const inputCount = document.querySelectorAll(".count");
  inputCount.forEach((element) => {
    element.addEventListener("change", async (e) => {
      const id = element.getAttribute("data-id");
      const inputCountValue = e.target.value;
      await updateQuantityCartItem(id, inputCountValue);
      showTotalCard();
    });
  });
};

const showTotalCard = () => {
  const subtotalPrice = document.querySelector(".subtotal-price");
  subtotalPrice.innerText = "$" + totalCartCalculator().toFixed(2);
};

const checkoutEvent = () => {
  const checkout = document.querySelector("#check-out");
  checkout.addEventListener("click", async (e) => {
    e.preventDefault(); // Ngăn chặn việc gửi biểu mẫu
    await orderSevice();
  });
};

const showCart = () => {
  const cartColum = document.querySelector(".cart-colum");
  const mapCart = cartState.map((cartItem) => {
    const product = getProductById(cartItem.productID);
    if (product) {
      return {
        ...product,
        ...cartItem,
      };
    }
  });

  const result = mapCart.map((value) => {
    return ` <div class="cart-item" data-id="${value.productID}">
                    <div class="cart-item-img">
                        <img src="${value.image}" alt="">
                    </div>
                    <div class="cart-item-desc">
                        <h3>${value.productName}</h3>
                        <span id="cart-item-price">${value.currentPrice}</span>
                        <div class="quantity">
                            <button data-id="${value.productID}" class="quantity-left"><i class="fa-solid fa-minus"></i></button>
                            <input data-id="${value.productID}" value="${value.quantity}" class ="count">
                            <button data-id="${value.productID}" class="quantity-right"><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                    <div class="remove" data-id="${value.productID}"><i class="fa-solid fa-xmark"></i></div>
                </div>`;
  });

  cartColum.innerHTML = result.join(" ");

  deleteCartEvent();
  updateQuantityEvent();
  inputChangeEvent();
  showTotalCard();
  checkoutEvent();
};

export { showCart, openCart, cartEvent };
