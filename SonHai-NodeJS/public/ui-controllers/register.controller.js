import { register } from "../services/users.service.js";

const createValueRegisterForm = () => {
  const registerForm = document.querySelector("#registerForm");
  console.log(registerForm);
  
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Ngăn chặn việc gửi biểu mẫu

    const emailValue = document.querySelector("#email").value;
    const passwordValue = document.querySelector("#password").value;
    const rePasswordValue = document.querySelector("#re-password").value;

    const data = {
      email: emailValue,
      passWord: passwordValue,
      rePassword: rePasswordValue
    };

    register(data);
  });
};
createValueRegisterForm()