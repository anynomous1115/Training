const success = (message, code, res, data) => {
  res.status(code).json({
    message: message,
    code: code,
    data: data,
  });
};
module.exports = {
  success,
};
