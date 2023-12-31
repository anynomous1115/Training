const { errorHandler } = require("../helper/response");

const validBodyData = (schema, fieldCheck) => (req, res, next) => {
  const body = req.body;
  const { email, password } = body;
  let hasError = false;
  if (!email || !password) {
    errorHandler(res,"Bad Request !",400, "Missing data to signup!");

  } else {
    fieldCheck.forEach((element) => {
      if (typeof body[element] !== typeof schema[element].type) {
        errorHandler(res,"Bad Request !",400, `Invalid ${element}`);
        hasError = true;
        return;
      }

      const isValid = schema[element].regex.test(body[element]);
      if (!isValid) {
        errorHandler(res,"Bad Request !",400, `Invalid ${element}`);

        hasError = true;
        return;
      }
    });
    if (!hasError) {
      next();
    }
  }
};

module.exports = {
  validBodyData,
};
