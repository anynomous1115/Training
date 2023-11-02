const errResponse = (res, code, message) => {
  res.status(code).json({ code: code, message: message });
};
module.exports={
    errResponse
}