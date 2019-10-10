const express = require("express");
const { auth } = require("../config/passport");

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
