import { register } from "../services/users.service.js";
import {
  checkEmailBlankAndFormat,
  checkPasswordBlank,
  checkPasswordFormat,
  checkPasswordLength,
  checkRePasswordBlank,
  comparePasswords,
} from "../utils/checkValid.js";

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const rePassword = document.querySelector("#re-password");

const createValueRegisterForm = () => {
  const registerForm = document.querySelector("#registerForm");

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Ngăn chặn việc gửi biểu mẫu
    const emailValue = email.value;
    const passwordValue = password.value;
    const rePasswordValue = rePassword.value;

    const isAllValid =
      checkEmailBlankAndFormat(emailValue) &&
      checkPasswordBlank(passwordValue) &&
      checkPasswordLength(passwordValue) &&
      checkPasswordFormat(passwordValue) &&
      checkRePasswordBlank(rePasswordValue) &&
      comparePasswords(passwordValue, rePasswordValue);

    if (isAllValid) {
      const data = {
        email: emailValue,
        password: passwordValue,
        rePassword: rePasswordValue,
      };
      register(data);
    }
  });
};
createValueRegisterForm();
