const cors = require("cors");
const server = require("../config/server");
const handlers = require("../utils/handlers");
const { validateConfigAuth, validateRouter } = require("../utils/validators");
const { configureAuth } = require("../config/passport");
const { generateAuthRouter } = require("../routes/auth.routes");

exports.createServer = (routers, config = {}) => {
  if (!routers || !routers.length) {
    throw new Error("createServer requires a router object");
  }

  const routesPrefix = config.routesPrefix || "/";

  if (config.allowCors) {
    server.use(cors());
  }

  if (validateConfigAuth(config)) {
    // eslint-disable-next-line global-require
    const passport = require("passport");
    server.use(passport.initialize());
    configureAuth(config);
  }

  // enabled by default
  if (config.forceJsonResponse !== false) {
    server.use(handlers.forceJsonResponse());
  }

  if (validateConfigAuth(config)) {
    server.use(
      routesPrefix,
      generateAuthRouter(
        {
          secret: config.auth.jwtSecret,
          issuer: config.auth.issuer,
          audience: config.auth.audience,
          payloadFields: config.auth.payloadFields
        },
        config.auth.loginRedirection
      )
    );
  }

  /**
   * External routes are configured at the end, so we are sure
   * that public routes like social login routes, are not protected.
   * As this follows the middleware approach, if a protected router
   * is attached, every router attached after it will be also protected.
   */
  validateRouter(routers).forEach(router => server.use(routesPrefix, router));

  server.use(handlers.notFoundHandler());
  server.use(handlers.errorHandler());

  return server;
};
