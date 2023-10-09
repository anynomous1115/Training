import { login } from "../services/users.service.js";
import {
  checkEmailBlankAndFormat,
  checkPasswordBlank,
} from "../utils/checkValid.js";

const password = document.getElementById("password");
const email = document.getElementById("email");

const createValueLoginForm = () => {
  const loginForm = document.querySelector("#loginForm");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Ngăn chặn việc gửi biểu mẫu
    const emailValue = email.value;
    const passwordValue = password.value;
    const isAllValid =
      checkEmailBlankAndFormat(emailValue) && checkPasswordBlank(passwordValue);
    if (isAllValid) {
      const data = {
        email: emailValue,
        password: passwordValue,
      };
      login(data);
    }
  });
};
createValueLoginForm();
