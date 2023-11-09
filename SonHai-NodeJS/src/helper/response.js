const errorHandler = (res, message, code, error) => {
  res.status(code || 400).json({
    error: error,
    message: message || "Something went wrong, please access later !",
    code: code || 400,
  });
};
const successHandler = (res, data, message, code) => {
  res.status(code || 200).json({
    data: data,
    message: message || "successful",
    code: code || 200,
  });
};
module.exports = {
  errorHandler,
  successHandler,
};
