// const jwt = require("jsonwebtoken");

// const authenToken = (req, res, next) => {
//   console.log("cookies", req.cookies);
//   const accessToken = req.cookies.access_token;
//   console.log(accessToken);
//   if (accessToken == undefined) {
//     res.status(401).send({ error: "Not authorized to access this resource" });
//     return;
//   }
//   next();
// };
// module.exports = {
//   authenToken,
// };
