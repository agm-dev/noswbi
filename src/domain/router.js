const express = require("express");
const { auth } = require("../config/passport"); // TODO: move auth outside passport config, place it on domain

/**
 * If later we change the server library we should
 * create here the interface to keep the same api
 * for the returned router object.
 * Methods to keep:
 * - use (for middleware)
 */
exports.createRouter = ({ requireAuth } = {}) => {
  const router = express.Router();

  if (requireAuth) {
    router.use(auth());
  }

  return router;
};

/**
 * TODO: ideas
 * - add a config to add a prefix before every route in this router
 * - add a method to include a middleware before every route
 * in this router (auth middleware for example). Check if that can
 * already be done with use or something
 */
