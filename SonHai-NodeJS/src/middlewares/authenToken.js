const jwt = require("jsonwebtoken");

const authenToken = async (req, res, next) => {
  console.log("cookies", req.cookies);
  const accessToken = req.cookies.access_token;
  if (!accessToken) {
    res.status(401).send({ error: "Not authorized to access this resource 123" });
    return;
  }
  try {
    const data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.idUser = data.id;
    next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};
module.exports = {
  authenToken,
};
