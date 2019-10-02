const cors = require("cors");
const server = require("../config/server");
const handlers = require("../utils/handlers");
const { validateConfigAuth } = require("../utils/validators");
const authRouter = require("../routes/auth.routes");

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

  const routesPrefix = config.routesPrefix || "/";
  server.use(routesPrefix, router);

  // TODO: swagger openapi endpoint
  // TODO: health / status endpoint

  // TODO: passport auth endpoint if enabled from options

  // TODO: config.auth is an object with required configuration
  // for social login (google). Add an util to validate the provided
  // config or throw proper errors
  if (config.auth && validateConfigAuth(config.auth)) {
    // TODO: create utility validateConfigAuth
    server.use(routesPrefix, authRouter);
  }
  //

  server.use(handlers.notFoundHandler());
  server.use(handlers.errorHandler());

  return server;
};
