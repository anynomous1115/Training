const validBodyData = (schema, fieldCheck) => (req, res, next) => {
  const body = req.body;
  let hasError = false;

  fieldCheck.forEach((element) => {
    if (typeof body[element] !== typeof schema[element].type) {
      res.status(400).json({ message: `Invalid ${element}` });
      hasError = true;
      return;
    }

    const isValid = schema[element].regex.test(body[element]);
    if (!isValid) {
      res.status(400).json({ message: `Invalid ${element}` });
      hasError = true;
      return;
    }
  });
  if (!hasError) {
    next();
  }
};

module.exports = {
  validBodyData,
};
