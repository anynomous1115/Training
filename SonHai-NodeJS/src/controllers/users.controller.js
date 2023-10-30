const {
  registerService,
  loginService,
  checkUserLoginService,
} = require("../services/users.sevice");

const register = async (req, res) => {
  const { email, password, rePassword } = req.body;
  try {
    if (rePassword !== password) {
      res
        .status(400)
        .json({ status: 400, message: "Confirm Password is incorrect!" });
      return;
    }
    await registerService({ email, password });

    res
      .status(200)
      .json({ status: 200, message: "User successfully created!" });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, message: error.message || "Registration failed!" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { accessToken, ageToken } = await loginService({ email, password });
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      ageToken: ageToken,
    });

    res.status(200).json({
      status: 200,
      message: "Logged in successfully!",
      accessToken,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, message: error.message || "Login failed!" });
  }
};

const logout = async (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ status: 200, message: "Successfully logged out!" });
};

const checkUserLogin = async (req, res) => {
  try {
    const isExistingUser = await checkUserLoginService(req.accessTokenVerify);
    if (isExistingUser) {
      res.status(200).json(isExistingUser.email);
    } else {
      res.status(400).json({ status: 400, message: "You are not logged in!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, message: error.message || "Something went wrong!" });
  }
};

module.exports = {
  register,
  login,
  logout,
  checkUserLogin,
};
