const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getData } = require("./service");

const saltRound = 10;

const getUsersService = async () => {
  try {
    const data = await getData();
    const { users } = data;
    return users;
  } catch (error) {
    console.log({ message: "Something went wrong!" });
  }
};

const registerService = async (dataBody) => {
  try {
    const { email, password } = dataBody;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const user = {
      idUser: uuidv4(),
      email: email,
      password: hashedPassword,
    };

    return user;
  } catch (error) {
    console.log({ message: "Something went wrong!" });
  }
};

const loginService = (userChecking) => {
  try {
    const ageToken = 3600;
    const accessToken = jwt.sign(
      { id: userChecking.idUser },
      process.env.ACCESS_TOKEN_SECRET
    );

    return {
      accessToken,
      ageToken,
    };
  } catch (error) {
    console.log({ message: "Something went wrong!" });
  }
};

const checkUserLoginService = (accessToken) => {
  try {
    const { idUser } = accessToken;
    return idUser;
  } catch (error) {
    console.log({ message: "Something went wrong!" });
  }
};

module.exports = {
  registerService,
  loginService,
  getUsersService,
  checkUserLoginService,
};
