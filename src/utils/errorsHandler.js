const httpStatus = require("http-status");
const ApiError = require("./ApiError");

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
