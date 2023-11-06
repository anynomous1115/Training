const jwt = require("jsonwebtoken");
const { errResponse } = require("../helper/errResponse");

const authenToken = async (req, res, next) => {
  const accessToken = req.cookies.access_token;
  console.log({accessToken});
  if (!accessToken) {
    errResponse(res, 401, "Not authorized to access this resource!");
    return;
  }

  try {
    const data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.accessTokenVerify = data;
    next();
  } catch (error) {
    errResponse(res, 401, "Not authorized to access this resource!");
  }
};
module.exports = {
  authenToken,
};
