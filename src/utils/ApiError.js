const httpStatus = require("http-status");

class ApiError {
  constructor(code, name, message) {
    this.code = code || httpStatus.INTERNAL_SERVER_ERROR;
    this.name = name || "UNKNOWN";
    this.message = message || "";
  }
}

module.exports = ApiError;
