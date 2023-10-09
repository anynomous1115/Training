const { writeFileJson } = require("../services/service");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pathFileJson = path.join(__dirname, "../db/db.json");
const saltRound = 10;

const registerApi = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = req.dataUsers.find((i) => i.email == email);
    if (checkUser !== undefined) {
      res.status(409).json({ message: "Account already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, saltRound);

    const user = {
      idUser: uuidv4(),
      email: email,
      password: hashedPassword,
    };

    req.dataUsers.push(user);

    const cart = {
      idUser: user.idUser,
      cartItemId: uuidv4(),
    };

    req.dataCarts.push(cart);

    const cartItem = {
      cartItemId: cart.cartItemId,
      item: [],
    };

    req.dataCartItem.push(cartItem);

    await writeFileJson(pathFileJson, JSON.stringify(req.data));
    res.status(200).json("User successfully created");
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

const loginApi = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await req.dataUsers.find((i) => i.email == email);

    if (checkUser == undefined) {
      res.status(400).json({ message: "Account does not exist" });
      return;
    } else {
      bcrypt.compare(password, checkUser.password).then((result) => {
        if (result) {
          const ageToken = 3600;
          const accessToken = jwt.sign(
            { id: checkUser.idUser },
            process.env.ACCESS_TOKEN_SECRET
          );
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
    res.status(400).json({ message: "Something went wrong" });
  }
};

const logoutApi = async (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out" });
};

const checkUserLogin = async (req, res) => {
  const checkUser = await req.dataUsers.find((i) => i.idUser == req.idUser);

  if (checkUser) {
    res.status(200).json(checkUser);
  } else {
    res.status(400).json({ message: "You are not logged in" });
  }
};

module.exports = {
  registerApi,
  loginApi,
  logoutApi,
  checkUserLogin,
};
