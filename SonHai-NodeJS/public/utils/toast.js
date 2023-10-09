function showSuccessToastWithAutoHide(message,color) {
  Toastify({
    text: message,
    duration: 3000, // Thời gian hiển thị (ms)
    gravity: "top", // Vị trí hiển thị (bottom, top, center)
    backgroundColor: color,
    autoHide: true, // Tự động ẩn đi sau thời gian
    delay: 2000, // Thời gian trễ trước khi tự động ẩn đi (ms)
  }).showToast();
}

export { showSuccessToastWithAutoHide };
