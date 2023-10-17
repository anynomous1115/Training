const bcrypt = require("bcrypt");
const path = require("path");

const { writeFileJson, findInData } = require("../services/service");
const {
  registerService,
  loginService,
  getUsersService,
  checkUserLoginService,
} = require("../services/users.sevice");
const { dataUpdate } = require("../services/updateNewData");

const pathFileJson = path.join(__dirname, "../db/db.json");

const register = async (req, res) => {
  const { email, password, rePassword } = req.body;
  const users = await getUsersService();
  try {
    if (rePassword !== password) {
      res.status(400).json({ message: "Confirm Password is incorrect" });
      return;
    }

    const userChecking = await findInData(users, "email", email);

    if (userChecking !== undefined) {
      res.status(409).json({ message: "Account already exists" });
      return;
    }
    const user = await registerService(req.body);

    const newData = await dataUpdate(user, "users");

    await writeFileJson(pathFileJson, JSON.stringify(newData));
    res.status(200).json("User successfully created");
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const users = await getUsersService();
  try {
    const userChecking = await findInData(users, "email", email);
    if (userChecking == undefined) {
      res.status(400).json({ message: "Account does not exist" });
      return;
    } else {
      bcrypt.compare(password, userChecking.password).then((result) => {
        if (result) {
          const { accessToken, ageToken } = loginService(userChecking);
          res.cookie("access_token", accessToken, {
            httpOnly: true,
            ageToken: ageToken,
          });

          res.status(200).json({
            message: "Logged in successfully",
            accessToken,
          });
        } else {
          res.status(401).json({ message: "Logged in not successfully" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong12" });
  }
};

const logout = async (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out" });
};

const checkUserLogin = async (req, res) => {
  const users = await getUsersService();
  const idUser = checkUserLoginService(req.accessToken);

  const userChecking = await findInData(users, "idUser", idUser);
  if (userChecking) {
    res.status(200).json(userChecking.email);
  } else {
    res.status(400).json({ message: "You are not logged in" });
  }
};

module.exports = {
  register,
  login,
  logout,
  checkUserLogin,
};
