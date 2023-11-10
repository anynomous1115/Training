const errorHandler = (
  res,
  message = "Something went wrong, please access later !",
  code = 400,
  error
) => {
  res.status(code).json({
    error,
    message,
    code,
  });
};
const successHandler = (res, data, message = "Successful", code = 200) => {
  res.status(code).json({
    data: data,
    message: message,
    code: code,
  });
};
module.exports = {
  errorHandler,
  successHandler,
};
