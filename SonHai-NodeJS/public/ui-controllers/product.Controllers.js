import { productsState } from "../ui-global-state/state.js";
import { addToCart } from "../services/cart.service.js";
import { openCart, showCart } from "./cart.controller.js";

const menuEvent = () => {
  const iconMenu = document.querySelector("#iconMenu");
  const menuItem_wrap = document.querySelector(".menuItem_wrap");
  const products = document.querySelector(".products");
  iconMenu.addEventListener("click", () => {
    menuItem_wrap.style.display = "block";
  });
  products.addEventListener("click", () => {
    menuItem_wrap.style.display = "none";
  });
};

function showSize(sizes) {
  let sizeString = "";
  let sizeAfter = [];
  for (let i = 0; i < sizes.length; i++) {
    let div = "<div class='size-item'>" + sizes[i] + "</div>";
    sizeAfter.push(div);
  }
  for (let i = 0; i < sizeAfter.length; i++) {
    sizeString += sizeAfter[i];
  }
  return sizeString;
}

function showColor(colors) {
  let colorString = "";
  let colorAfter = [];
  for (let i = 0; i < colors.length; i++) {
    let div =
      '<div class="color"><div class="color-item" style="background-color:' +
      colors[i] +
      '"></div></div>';
    colorAfter.push(div);
  }
  for (let i = 0; i < colorAfter.length; i++) {
    colorString += colorAfter[i];
  }
  return colorString;
}

const colorsEvent = () => {
  const colors = document.querySelectorAll(".color");
  colors.forEach(function (color) {
    color.addEventListener("click", function () {
      // Kiểm tra xem phần tử có lớp "open" hay không
      if (this.classList.contains("active")) {
        // Nếu có, xóa
        this.classList.remove("active");
      } else {
        let parent = this.parentNode;
        let child = parent.querySelectorAll(".color");
        // Nếu không, thêm
        child.forEach(function (c) {
          c.classList.remove("active");
        });
        this.classList.add("active");
      }
    });
  });
};
// Lặp qua từng phần tử và gắn sự kiện click

const sizesEvent = () => {
  const sizes = document.querySelectorAll(".size-item");
  sizes.forEach(function (size) {
    size.addEventListener("click", function () {
      if (this.classList.contains("active-size")) {
        this.classList.remove("active-size");
      } else {
        let parent = this.parentNode;
        let child = parent.querySelectorAll(".size-item");
        child.forEach(function (c) {
          c.classList.remove("active-size");
        });
        this.classList.add("active-size");
      }
    });
  });
};

const addToCartEvent = () => {
  const btn_addToCart = document.querySelectorAll(".add-to-cart");

  btn_addToCart.forEach((element) => {
    element.addEventListener("click", () => {
      openCart(true);
      const id = element.getAttribute("data-id");
      addToCart(id);
      showCart();
    });
  });
};

function showProduct() {
  const productItem = document.querySelector(".product-grid");
  for (let item of productsState) {
    var currentProduct =
      item.originalPrice - (item.originalPrice / 100) * item.disCount;
    item.currentPrice = currentProduct;
    productItem.innerHTML += `
                    <div class="product-grid-item">
                    <div class="wrap-img">
                        <div class="img-product">
                            <img src="${item.image}" alt="">
                        </div>
                        <div class="img-hover" style="background-image:url(${
                          item.imageHover
                        })"></div>
                        <span class="discount">
                            -${item.disCount}%
                        </span>
                        <div class="wish-list">
                            <a href="" class="favourite">
                                <i class="fa-regular fa-heart heartAnimation"></i>
                            </a>
                            <a href="" class="favourite">
                                <i class="fa-solid fa-rotate"></i>
                            </a>
                        </div>
                        <div class="btn-product-item">
                            <a href="" class="quick-view">
                                Quick View
                            </a>
                            <button data-id="${item.id}" class="add-to-cart">
                                    Add To Cart
                            </button>
                        </div>
                        <div class="size">
                        ${showSize(item.size)}
                        </div>
                    </div>
                    <div class="img-desc">
                        <h3 class="name">
                            <a href="">${item.name}</a>
                        </h3>
                        <div class="price">
                            <span class="current">
                            $${item.currentPrice}
                            </span>
                            <span class="original-price">
                            $${item.originalPrice}.00
                            </span>
                        </div>
                        <div class="color-product">
                            ${showColor(item.color)}
                        </div>
                    </div>
                    </div>
              `;
  }

  addToCartEvent();
}

export { showProduct, colorsEvent, sizesEvent, menuEvent };
