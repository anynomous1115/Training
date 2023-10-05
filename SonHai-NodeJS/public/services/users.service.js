const register = async (data) => {
  fetch("/api/registerApi", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        window.location.href = "/login";
      }
    })
    .catch((error) => {
      console.log({ message: "co loi r" });
    });
};

const login = async (data) => {
  fetch("/api/loginApi", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        window.location.href = "/";
      } else {
        return res.json();
      }
    })
    .then((data) => {
      const messErrPass = document.querySelector(".messErrPass");
      messErrPass.textContent = data.message;

      console.log(data.message);
    })
    .catch((error) => {
      console.log({ message: "co loi r" });
    });
};
const logout = () => {
  fetch("/api/logoutApi", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        window.location.href = "/";
        return res.json();
      }
    })
    .then((data) => {
      alert(data.message);
    })
    .catch((error) => {
      console.log({ message: "co loi r" });
    });
};
export { register, login, logout };
