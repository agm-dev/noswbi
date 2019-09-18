const httpStatus = require("http-status");
const ApiError = require("./ApiError");

exports.forceJsonResponse = () => (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
};

exports.notFoundHandler = ({ logger } = {}) => (req, res) => {
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

/**
 * Express error handlers requires a 4 params
 * signature in the middleware function to use
 * it as error handler.
 */
// eslint-disable-next-line no-unused-vars
exports.errorHandler = (config = {}) => (err, req, res, next) => {
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
