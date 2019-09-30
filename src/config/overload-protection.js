/**
 * Including this middleware requires to add "testEnvironment": "node"
 * into the "jest" config on package.json, because the dependency
 * uses setInterval(...).unref() and unref only exists on node environment.
 *
 * Check Jest docs and following StackOverflow post:
 *
 * https://stackoverflow.com/questions/41642672/jest-test-fails-when-environment-is-configured-with-webpack-hot-middleware
 * https://jestjs.io/docs/en/configuration#testenvironment-string
 *
 */
const protect = require("overload-protection");

const config = {
  production: process.env.NODE_ENV === "production", // if production is false, detailed error messages are exposed to the client
  clientRetrySecs: 1, // Client-Retry header, in seconds (0 to disable) [default 1]
  sampleInterval: 5, // sample rate, milliseconds [default 5]
  maxEventLoopDelay: 42, // maximum detected delay between event loop ticks [default 42]
  maxHeapUsedBytes: 0, // maximum heap used threshold (0 to disable) [default 0]
  maxRssBytes: 0, // maximum rss size threshold (0 to disable) [default 0]
  errorPropagationMode: false // dictate behavior: take over the response or propagate an error to the framework [default false]
};

module.exports = protect("express", config);
