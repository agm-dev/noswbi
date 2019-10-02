const { createServer } = require("./domain/server");
const { createRouter } = require("./domain/router");
// TODO: export auth middleware JWT so users can use it on their routes

module.exports = {
  createServer,
  createRouter
};
