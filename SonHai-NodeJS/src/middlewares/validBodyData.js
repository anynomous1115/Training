const validBodyData = (schema, fieldCheck) => (req, res, next) => {
  const body = req.body;
  const { email, password } = body;
  let hasError = false;
  if (!email || !password) {
    res.status(400).json({ status: 400, message: "Missing data to signup!" });
  } else {
    fieldCheck.forEach((element) => {
      if (typeof body[element] !== typeof schema[element].type) {
        res.status(400).json({ status: 400, message: `Invalid ${element}` });
        hasError = true;
        return;
      }

      const isValid = schema[element].regex.test(body[element]);
      if (!isValid) {
        res.status(400).json({ status: 400, message: `Invalid ${element}` });
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
