const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const bodyParser = require("body-parser");
const protect = require("./overload-protection");

/**
 * If later we change the server library we should
 * create here the interface to keep the same api
 * for the server object.
 * Methods to keep:
 * - set (to attach config and endable / disable some properties)
 * - use (for middleware and router)
 * - listen (to start the server)
 */
const server = express();

server.set("x-powered-by", false); // helmet should include this one

/**
 * Enabled only on production environment
 * on test environment produces some
 * 503 erros which makes tests to fail
 * randomly.
 */
if (process.env.NODE_ENV === "production") {
  server.use(protect); // overload-protection
}

server.use(helmet()); // protects from well known web vulnerabilities
server.use(compression()); // compress all responses
server.use(bodyParser.json()); // parses application/json
server.use(bodyParser.urlencoded({ extended: false }));

module.exports = server;
