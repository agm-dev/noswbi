const { createServer } = require("./domain/server");
const { createRouter } = require("./domain/router");
const { auth } = require("./config/passport");
// TODO: export auth middleware JWT so users can use it on their routes

module.exports = {
  createServer,
  createRouter,
  auth
};
