# noswbi

[![Build Status](https://travis-ci.org/agm-dev/noswbi.svg?branch=master)](https://travis-ci.org/agm-dev/noswbi)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1b29f2fe0b184df0a3be55f95bb45912)](https://www.codacy.com/manual/agm-dev/noswbi?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=agm-dev/noswbi&amp;utm_campaign=Badge_Grade)
[![Codacy](https://api.codacy.com/project/badge/coverage/1b29f2fe0b184df0a3be55f95bb45912)](https://www.codacy.com/app/codacy/node-codacy-coverage)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/agm-dev/noswbi)
![GitHub All Releases](https://img.shields.io/github/downloads/agm-dev/noswbi/total)
![GitHub](https://img.shields.io/github/license/agm-dev/noswbi)

Noswbi is a NodeJS HTTP server with everything but routes configured.

## Install

```bash
npm install --save noswbi
```

## Usage

The idea behind noswbi is providing a configured server, so you can focus only on coding the routes and logic of your API.

Noswbi exposes two methods: `createRouter` and `createServer`:

```javascript
// Import the two required noswbi methods to create the server:
const { createRouter, createServer } = require("noswbi");

// Create the router:
const router = createRouter();

// Add your logic to the router:
router.get("/status", (req, res) => res.status(200).json({ status: "OK" }));

// Create the server by providing the configured router:
const server = createServer(router);

// Start
server.listen(3000);
```

## Features

Noswbi includes the following configuration / features:

- helmet
- compression
- body-parser for JSON and urlencoded (extended false)
-  cors (can be enabled with `createServer(router, { allowCors: true }))
- forces `Content-Type: application/json` on response headers (can be disabled with `createServer(router, { forceJsonResponse: false })`)
- attach router routes to `/` unless `routesPrefix` provided on config when creating the server
- 404 not found handler included
- error handler included

## Production

Don't forget to set the `NODE_ENV` variable to `"production"`. It will improve the performance of the server and will remove the stack trace from error handler.
