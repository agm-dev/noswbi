const cors = require("cors");
const server = require("../config/server");
const handlers = require("../utils/handlers");

exports.createServer = (router, config = {}) => {
  if ([undefined, null].includes(typeof router)) {
    throw new Error("createServer requires a router object");
  }

  if (config.allowCors) {
    server.use(cors());
  }

  // enabled by default
  if (config.forceJsonResponse !== false) {
    server.use(handlers.forceJsonResponse());
  }

  // TODO: setup logging system from options, or generic one with winston

  // TODO: swagger openapi endpoint
  // TODO: health / status endpoint

  // TODO: passport auth endpoint if enabled from options

  const routesPrefix = config.routesPrefix || "/";
  server.use(routesPrefix, router);

  server.use(handlers.notFoundHandler());
  server.use(handlers.errorHandler());

  return server;
};
