const errorHandler = (err, res, code) => {
  let message = "Server is wrong, please access later !";
  let statusCode = 500;
  let errors = {};
  res.status(code || statusCode).json({
    message: err.message || message,
    code: code || statusCode,
    error: err.error || errors,
  });
};
module.exports = {
  errorHandler,
};
