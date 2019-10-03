const express = require("express");

/**
 * If later we change the server library we should
 * create here the interface to keep the same api
 * for the returned router object.
 * Methods to keep:
 * - use (for middleware)
 */
exports.createRouter = () => express.Router();

/**
 * TODO: ideas
 * - add a config to add a prefix before every route in this router
 * - add a method to include a middleware before every route
 * in this router (auth middleware for example). Check if that can
 * already be done with use or something
 */
