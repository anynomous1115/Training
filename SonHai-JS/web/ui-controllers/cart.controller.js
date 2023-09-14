import { cartState } from "../ui-global-state/state.js";
import { updateQuantityCartItem, deleteCartItem, totalCartCalculator } from "../services/cart.service.js";
import { getProductById } from "../utils/findById.js";

// Tạo function openCart(true) | openCart(false)

const openCart = (isOpen) => {
    const showCartItem = document.querySelector(".show-cart")
    const cart = document.querySelector(".cart")
    const overLay = document.querySelector(".cart__overlay")

    if (isOpen) {
        showCartItem.style.display = "block"
        cart.classList.add("cart__open")
        overLay.style.display = "block"
        showCart()
    } else {
        cart.classList.remove("cart__open")
        showCartItem.style.display = "none"
        overLay.style.display = "none"
    }
}

const cartEvent = () => {
    const btnOpenCart = document.querySelector(".btnCart")
    const closeCart = document.querySelector(".close-icon")
    const overLay = document.querySelector(".cart__overlay")

    btnOpenCart.addEventListener('click', () => {
        openCart(true)
    })

    closeCart.addEventListener('click', () => {
        openCart(false)
    })

    overLay.addEventListener('click', () => {
        openCart(false)
    })
}

const updateQuantityEvent = () => {
    const quantity_left = document.querySelectorAll(".quantity-left")

    quantity_left.forEach(element => {
        element.addEventListener("click", () => {
            const id = element.getAttribute("data-id");
            updateQuantityCartItem(id, -1)
            updateQuantityDOM(id)
            showTotalCard()
        })
    })

    const quantity_right = document.querySelectorAll(".quantity-right")

    quantity_right.forEach(element => {
        element.addEventListener("click", () => {
            const id = element.getAttribute("data-id");
            updateQuantityCartItem(id, 1)
            updateQuantityDOM(id)
            showTotalCard()
        })
    })
}

const updateQuantityDOM = (id) => {
    const countDOM = document.querySelector(`.count[data-id="${id}"]`)
    const countValue = cartState.find(i => i.id === id)
    countDOM.value = countValue.quantity

}

const deleteCartEvent = () => {
    const btn_Remove = document.querySelectorAll(".remove");
    btn_Remove.forEach(element => {
        element.addEventListener("click", () => {
            const id = element.getAttribute("data-id");
            deleteCartItem(id)
            deleteCartDOM(id)
            showTotalCard()
        })
    })
}

const deleteCartDOM = (id) => {
    const cartItemDOM = document.querySelector(`.cart-item[data-id="${id}"]`)
    cartItemDOM.remove(`.cart-item[data-id="${id}"]`)
}

const inputChangeEvent = () => {
    const inputCount = document.querySelectorAll(".count")
    inputCount.forEach(element => {
        element.addEventListener("change", (e) => {
            const id = element.getAttribute("data-id");
            const inputCountValue = e.target.value;
            updateQuantityCartItem(id, inputCountValue)
            showTotalCard()
        })
    })
}

const showTotalCard = () => {
    const subtotalPrice = document.querySelector(".subtotal-price")
    subtotalPrice.innerText = "$" + totalCartCalculator().toFixed(2)
}

const showCart = () => {
    const cartColum = document.querySelector(".cart-colum")
    const mapCart = cartState.map(cartItem => {
        const product = getProductById(cartItem.id)
        if (product) {
            return {
                ...product,
                ...cartItem,
            }
        }
    })

    const result = filterCart.map(value => {
        return ` <div class="cart-item" data-id="${value.id}">
                    <div class="cart-item-img">
                        <img src="${value.image}" alt="">
                    </div>
                    <div class="cart-item-desc">
                        <h3>${value.name}</h3>
                        <span id="cart-item-price">${value.currentPrice}</span>
                        <div class="quantity">
                            <button data-id="${value.id}" class="quantity-left"><i class="fa-solid fa-minus"></i></button>
                            <input data-id="${value.id}" value="${value.quantity}" class ="count">
                            <button data-id="${value.id}" class="quantity-right"><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                    <div class="remove" data-id="${value.id}"><i class="fa-solid fa-xmark"></i></div>
                </div>`
    })

    cartColum.innerHTML = result.join(" ")

    deleteCartEvent()
    updateQuantityEvent()
    inputChangeEvent()
    showTotalCard()
}


export {
    showCart,
    openCart,
    cartEvent
}