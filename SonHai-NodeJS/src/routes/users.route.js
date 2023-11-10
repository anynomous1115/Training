const express = require("express");
const { validBodyData } = require("../middlewares/validBodyData");
const {
  register,
  login,
  logout,
  checkUserLogin,
} = require("../controllers/users.controller");
const { authenToken } = require("../middlewares/authenToken");
const router = express.Router();

const registerSchema = {
  email: {
    type: "string",
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: "string",
    regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=])[A-Za-z\d@#$%^&+=]{8,}$/,
  },
};

const fieldCheckRegister = ["email", "password"];
const fieldCheckLogin = ["email"];
router.post(
  "/register",
  validBodyData(registerSchema, fieldCheckRegister),
  register
);

router.post("/login", validBodyData(registerSchema, fieldCheckLogin), login);

router.post("/logout", authenToken, logout);

router.get("/me", authenToken, checkUserLogin);

module.exports = router;
