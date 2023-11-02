import { openCart } from "../ui-controllers/cart.controller.js";
import { showSuccessToastWithAutoHide } from "../utils/toast.js";

const register = async (data) => {
  await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        return true;
      } else if (res.status === 409) {
        return false;
      }
    })
    .then((data) => {
      if (data) {
        showSuccessToastWithAutoHide("Đăng ký thành công!", "#0c8c6c");
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      } else {
        showSuccessToastWithAutoHide("Email đã tồn tại!", "#db4444");
      }
    })
    .catch((error) => {
      console.log({ message: "co loi r" });
    });
};

const login = async (data) => {
  await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        return true;
      }
      if (res.status === 401) {
        return false;
      }
    })
    .then((data) => {
      if (data) {
        window.location.href = "/";
      } else {
        showSuccessToastWithAutoHide(
          "Email hoặc mật khẩu không hợp lệ!",
          "#db4444"
        );
      }
    })
    .catch((error) => {
      console.log({ message: "co loi r" });
    });
};
const logout = async () => {
  await fetch("/api/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return true;
      } else {
        return false;
      }
    })
    .then((data) => {
      if (data) {
        window.location.href = "/";
      }
    })
    .catch((error) => {
      console.log({ message: "co loi r" });
    });
};
const checkUserLogIn = async () => {
  await fetch("/api/auth/verify-login", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      const btnMenu = document.querySelector(".btnMenu");
      const btnOpenCart = document.querySelector(".btnCart");
      if (res.ok) {
        btnMenu.innerHTML += `
        <i class="fa-solid fa-bars" style="display:none" id="iconMenu"></i>
        <div class="wrap-iconUser">
            <i class="fa-solid fa-user" id="iconUser"></i>
        <div class="emailUser"></div>
        </div>
         <div class="menuItem_wrap">
            <div class="menuItem">
                <a href="#" id="profile">Profile</a>
                <a href="./login.html" style="display:none" id="login">Login</a>
                <a href="./register.html" style="display:none" id="register">Register</a>
                <a href="#" id="logout">Logout</a>
            </div>
        </div>
        `;
        return res.json();
      } else {
        btnOpenCart.style.display = "none";
        btnMenu.innerHTML += `
        <div class="wrap-iconUser" style="display:none">
            <i class="fa-solid fa-user" id="iconUser"></i>
        <div class="emailUser"></div>
        </div>
        <div class="wrap-iconUser">
          <i class="fa-solid fa-bars" id="iconMenu"></i>
                </div>
                <div class="menuItem_wrap">
                    <div class="menuItem">
                    <a href="./login.html" id="login">Login</a>
                    <a href="./register.html" id="register">Register</a>
                    <a href="#" style="display:none" id="logout">Logout</a>
                    </div>
                </div>
        `;
      }
    })
    .then((result) => {
      const emailUser = document.querySelector(".emailUser");
      emailUser.textContent = result.data;
    })
    .catch((error) => {
      console.log("coa loi xay ra");
    });
};
export { register, login, logout, checkUserLogIn };
