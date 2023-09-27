const showPassword = () => {
    const showPass = document.querySelector(".show")
    const hiddenPass = document.querySelector(".hidden")
    if (isShow) {
        hiddenPass.style.display = "block"
        cart.classList.add("cart__open")
        overLay.style.display = "block"
        showCart()
    } else {
        cart.classList.remove("cart__open")
        showCartItem.style.display = "none"
        overLay.style.display = "none"
    }
}
showPassword()