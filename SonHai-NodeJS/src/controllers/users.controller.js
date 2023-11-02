const { errResponse } = require("../helper/errResponse");
const { errorHandler } = require("../helper/handleError");
const { success } = require("../helper/success");
const {
  registerService,
  loginService,
  checkUserLoginService,
} = require("../services/users.service");

const register = async (req, res) => {
  const { email, password, rePassword } = req.body;
  try {
    if (rePassword !== password) {
      errResponse(res, 400, "Confirm Password is incorrect!");
      return;
    }
    await registerService({ email, password });
    success("User successfully created!", 200, res);
  } catch (error) {
    errorHandler(error, res, 500);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { accessToken, ageToken } = await loginService({ email, password });
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      maxAge: ageToken * 1000,
    });

    success("Logged in successfully!", 200, res);
  } catch (error) {
    errorHandler(error, res, 500);
  }
};

const logout = async (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ code: 200, message: "Successfully logged out!" });
};

const checkUserLogin = async (req, res) => {
  try {
    const isExistingUser = await checkUserLoginService(req.accessTokenVerify);
    if (isExistingUser) {
      const { email } = isExistingUser;
      success("You are logged in", 200, res, email);
    } else {
      errResponse(res, 400, "You are not logged in!");
      return;
    }
  } catch (error) {
    errorHandler(error, res, 500);
  }
};

module.exports = {
  register,
  login,
  logout,
  checkUserLogin,
};