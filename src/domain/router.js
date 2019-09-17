const express = require("express");

/**
 * If later we change the server library we should
 * create here the interface to keep the same api
 * for the returned router object.
 * Methods to keep:
 * - use (for middleware)
 */
exports.createRouter = () => express.Router();
