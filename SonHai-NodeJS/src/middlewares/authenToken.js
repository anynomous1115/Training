const jwt = require("jsonwebtoken");
const { errorHandler } = require("../helper/response");

const authenToken = async (req, res, next) => {
  const accessToken = req.cookies.access_token;
  console.log({ accessToken });
  if (!accessToken) {
    errorHandler(
      res,
      "Unauthorized !",
      401,
      "Not authorized to access this resource!"
    );
    return;
  }

  try {
    const data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.accessTokenVerify = data;
    next();
  } catch (error) {
    errorHandler(
      res,
      "Unauthorized !",
      401,
      "Not authorized to access this resource!"
    );
  }
};
module.exports = {
  authenToken,
};
