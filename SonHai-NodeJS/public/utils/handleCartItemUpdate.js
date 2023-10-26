const handleCartItemUpdate = (isUpdated) => {
  if (!isUpdated) {
    const showCartItem = document.querySelector(".show-cart");
    showCartItem.style.display = "none";
    const overLay = document.querySelector(".cart__overlay");
    overLay.style.display = "none";

    showSuccessToastWithAutoHide("Bạn chưa đăng nhập!", "#db4444");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  }
};
export{
    handleCartItemUpdate
}