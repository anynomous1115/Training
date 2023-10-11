const { writeFileJson, findInData } = require("../services/service");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pathFileJson = path.join(__dirname, "../db/db.json");
const saltRound = 10;

const register = async (req, res) => {
  const { email, password } = req.body;
  const { users, carts, cartsItem } = req.data;
  try {
    const userChecking = await findInData(users, "email", email);
    if (userChecking !== undefined) {
      res.status(409).json({ message: "Account already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, saltRound);

    const user = {
      idUser: uuidv4(),
      email: email,
      password: hashedPassword,
    };

    users.push(user);

    const cart = {
      idUser: user.idUser,
      cartsItemId: uuidv4(),
    };

    carts.push(cart);

    const cartItem = {
      cartsItemId: cart.cartsItemId,
      items: [],
    };

    cartsItem.push(cartItem);

    await writeFileJson(pathFileJson, JSON.stringify(req.data));
    res.status(200).json("User successfully created");
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const { users } = req.data;
  try {
    const userChecking = await findInData(users, "email", email);

    if (userChecking == undefined) {
      res.status(400).json({ message: "Account does not exist" });
      return;
    } else {
      bcrypt.compare(password, userChecking.password).then((result) => {
        if (result) {
          const ageToken = 3600;
          const accessToken = jwt.sign(
            { id: userChecking.idUser },
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

const logout = async (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out" });
};

const checkUserLogin = async (req, res) => {
  const { users } = req.data;
  const { idUser } = req.accessToken;

  const userChecking = await findInData(users, "idUser", idUser);

  if (userChecking) {
    res.status(200).json(userChecking);
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
