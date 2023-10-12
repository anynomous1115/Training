const checkEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email);

  if (!isValidEmail) {
    res.status(400).json({ message: "Invalid email" });
    return;
  }

  next();
};
const checkPassword = (req, res, next) => {
  const { password, rePassword } = req.body;

  if (rePassword !== password) {
    res.status(400).json({ message: "Confirm Password not match" });
    return;
  }

  if (password.length < 8) {
    res
      .status(400)
      .json({ message: "Password must be greater than 8 characters" });
    return;
  }

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=])[A-Za-z\d@#$%^&+=]{8,}$/;
  const isValidPassword = passwordRegex.test(password);

  if (!isValidPassword) {
    res.status(400).json({
      message: "Password must contain letters, numbers, and special characters",
    });
    return;
  }
  next();
};

const validBodyData = (schema, fieldCheck) => (req, res, next) => {
  const body = req.body;
  let hasError = false
  
  fieldCheck.forEach((element) => {
    if (typeof body[element] !== typeof schema[element].type) {
      res.status(400).json({ message: `Invalid ${element}` });
      hasError = true
      return;
    }

    const isValid = schema[element].regex.test(body[element]);
    if (!isValid) {
      res.status(400).json({ message: `Invalid ${element}` });
      hasError = true
      return;
    }
  });
  if (!hasError) {
    next();
  }
};

module.exports = {
  checkEmail,
  checkPassword,
  validBodyData,
};
