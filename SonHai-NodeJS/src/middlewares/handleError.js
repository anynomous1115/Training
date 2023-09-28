const handleError = (err, req, res, next) => {
    console.error('Lỗi xảy ra:', err);
    res.status(500).json({ error: 'Đã xảy ra lỗi' });
  };
module.exports={
    handleError
}