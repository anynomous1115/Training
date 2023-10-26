const jwt = require("jsonwebtoken");

const authenToken = async (req, res, next) => {
  console.log("cookies", req.cookies);
  const accessToken = req.cookies.access_token;
  if (!accessToken) {
    res.status(401).json({
      status: 401,
      message: "Not authorized to access this resource!",
    });
    return;
  }

  try {
    const data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.accessTokenVerify =data;
    next();
  } catch (error) {
    res.status(401).json({
      status: 401,
      message: "Not authorized to access this resource!",
    });
  }
};
module.exports = {
  authenToken,
};
