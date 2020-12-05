exports.errorHandler = (err, req, res, next) => {
  const { code } = err;
  res.status(code).json(err);
  next();
};
