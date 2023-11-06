const errorHandler = (res, message, code) => {
  res.status(code || 500).json({
    message: message || "Server is wrong, please access later !",
    code: code || 500,
  });
};
const success = (res, data, message, code) => {
  res.status(code || 200).json({
    data: data,
    message: message || "successful",
    code: code || 200,
  });
};
module.exports = {
  errorHandler,
  success,
};
