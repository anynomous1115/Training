const { errorHandler, successHandler } = require("../helper/response");
const {
  registerService,
  loginService,
  checkUserLoginService,
} = require("../services/users.service");

const register = async (req, res) => {
  const { email, password, rePassword } = req.body;
  try {
    if (rePassword !== password) {
      errorHandler(res, "Confirm Password is incorrect!", 400);
      return;
    }
    await registerService({ email, password });
    successHandler(res, "User successfully created!", 200);
  } catch (error) {
    errorHandler(res, "Bad Request !", 400, error.message);
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
    successHandler(res, {}, "Logged in successfully!", 200);
  } catch (error) {
    errorHandler(res, "Bad Request !", 400, error.message);
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
      successHandler(res, email, "You are logged in", 200);
    } else {
      errorHandler(res, "You are not logged in!", 400);
      return;
    }
  } catch (error) {
    errorHandler(res, "Bad Request !", 400, error.message);
  }
};

module.exports = {
  register,
  login,
  logout,
  checkUserLogin,
};
