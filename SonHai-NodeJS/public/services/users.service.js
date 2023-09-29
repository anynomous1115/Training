const register = async (data) => {
  fetch("/api/registerApi", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(error => {
      console.error(error);
      // Xử lý lỗi nếu có
    });
};
export { register };
