const messErrEmail = document.querySelector(".messErrEmail");
const messErrPass = document.querySelector(".messErrPass");
const messErrRePass = document.querySelector(".messErrRe-Pass");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=])[A-Za-z\d@#$%^&+=]{8,}$/;

const showError = (item, message) => {
  item.textContent = message;
};

const checkEmailBlankAndFormat = (value) => {
  if (value === "") {
    showError(messErrEmail, "Email cannot be blank.");
    return false;
  }
  if (emailRegex.test(value) === false) {
    showError(messErrEmail, "Email is not valid.");
    return false;
  } else {
    showError(messErrEmail, "");
    return true;
  }
};

const checkPasswordBlank = (value) => {
  if (value === "") {
    showError(messErrPass, "Password cannot be blank.");
    return false;
  } else {
    showError(messErrPass, "");
    return true;
  }
};
const checkPasswordLength = (value) => {
  if (value.length < 8) {
    showError(messErrPass, "Password must be greater than 8 characters");
    return false;
  } else {
    showError(messErrPass, "");
    return true;
  }
};
const checkPasswordFormat = (value) => {
  if (passwordRegex.test(value) === false) {
    showError(
      messErrPass,
      "Password must contain letters, numbers, and special characters"
    );
    return false;
  } else {
    showError(messErrPass, "");
    return true;
  }
};

const checkRePasswordBlank = (value) => {
  if (value === "") {
    showError(messErrRePass, "Confirm Password cannot be blank.");
    return false;
  } else {
    showError(messErrRePass, "");
    return true;
  }
};

const comparePasswords = (passwordValue, rePasswordValue) => {
  if (passwordValue !== rePasswordValue) {
    showError(messErrRePass, "Confirm Password not match");
    return false;
  } else {
    showError(messErrRePass, "");
    return true;
  }
};
export {
  checkEmailBlankAndFormat,
  checkPasswordBlank,
  checkPasswordFormat,
  checkRePasswordBlank,
  comparePasswords,
  checkPasswordLength
};
