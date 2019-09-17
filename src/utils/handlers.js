const httpStatus = require("http-status");
const ApiError = require("./ApiError");

exports.notFoundHandler = (config = {}) => (err, req, res, next) => {
  // if there is an error just jump to the next handler
  if (err) {
    next();
    return;
  }

  const { logger } = config;
  if (logger) {
    // TODO: append to the log an object with some request data
    logger.info("not found");
  }

  res.status(httpStatus.NOT_FOUND);
  res.json({
    status: httpStatus.NOT_FOUND,
    message: "Requested route doesn't exist"
  });
};

exports.errorHandler = (config = {}) => (err, req, res) => {
  const { logger } = config;
  if (logger) {
    logger.error(err);
  }

  const error = new ApiError(
    httpStatus.INTERNAL_SERVER_ERROR,
    "INTERNAL_SERVER_ERROR"
  );
  res.status(error.code);
  res.json({ error });
};
