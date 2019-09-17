const cors = require("cors");
const server = require("../config/server");

exports.createServer = (router, config = {}) => {
  if ([undefined, null].includes(typeof router)) {
    throw new Error("createServer requires a router object");
  }

  if (config.allowCors) {
    server.use(cors());
  }

  // TODO: setup logging system from options, or generic one with winston

  // TODO: swagger openapi endpoint
  // TODO: health / status endpoint

  // TODO: passport auth endpoint if enabled from options

  server.route("/", router);

  // TODO: set error handlers

  return server;
};
