const { ErrorResponse } = require("../model/ErrorResponse");

exports.errorHandler = (err, req, res, next) => {
  let errors = { ...err };
  // mongoose validator happen
  if (err.name === "ValidationError") {
    errors = new ErrorResponse(400, {});
    for (let error in err.errors) {
      errors.message[error] = err.errors[error].message;
    }
  }
  // resource not found error
  else if (err.name === "CastError")
    errors = new ErrorResponse(404, "resource not found!");

  console.log(err.message);
  res.status(errors.code || 500).json({
    success: false,
    code: errors.code || 500,
    message: errors.message || "Server error!",
  });
  next();
};
