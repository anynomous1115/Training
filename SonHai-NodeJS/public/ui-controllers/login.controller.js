import { login } from "../services/users.service.js";

const password = document.getElementById("password");
const email = document.getElementById("email");
const messErrPass = document.querySelector(".messErrPass");
const messErrEmail = document.querySelector(".messErrEmail");

const checkEmail = () => {
  const emailValue = email.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(emailValue) == false) {
    messErrEmail.textContent = "Email is not valid.";
  } else {
    messErrEmail.textContent = "";
  }
};

email.addEventListener("change", checkEmail);


const createValueLoginForm = () => {
  const loginForm = document.querySelector("#loginForm");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Ngăn chặn việc gửi biểu mẫu
    const emailValue = email.value;
    const passwordValue = password.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValue) {
      messErrEmail.textContent = "Email cannot be blank.";
      return;
    } else if (emailRegex.test(emailValue) == false) {
      messErrEmail.textContent = "Email is not valid.";
    } else {
      messErrEmail.textContent = "";
    }
    if (!passwordValue) {
      messErrPass.textContent = "Password cannot be blank.";
      return;
    } else {
      messErrPass.textContent = "";
    }
    const data = {
      email: emailValue,
      password: passwordValue,
    };
    login(data);
  });
};
createValueLoginForm();
