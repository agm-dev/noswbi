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

## Features

Noswbi includes the following configuration / features:

- helmet
- compression
- overload protection (only on production environment)
- body-parser for JSON and urlencoded (extended false)
- cors (can be enabled with `createServer(router, { allowCors: true }))
- forces `Content-Type: application/json` on response headers (can be disabled with `createServer(router, { forceJsonResponse: false })`)
- attach router routes to `/` unless `routesPrefix` provided on config when creating the server
- authentication protection for routes
- social login with Google
- 404 not found handler included
- error handler included

## Production

Don't forget to set the `NODE_ENV` variable to `"production"`. It will improve the performance of the server and will remove the stack trace from error handler. It will also enable the overload protection.

## Usage

The idea behind noswbi is to provide a configured server, so you can focus only on coding the routes and logic of your API.

Noswbi exposes two methods: `createRouter` and `createServer`. You can use them to easily create a server.

### Simple server

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

### Server with social login and protected routes

```javascript
const mongoose = require("mongoose");
const { createRouter, createServer } = require("noswbi");

const router = createRouter();

router.get("/", (req, res) => res.send("holi"));

/**
 * The requests to the routes attached to this router require
 * an Authorization header with value `JWT ${token}`
 */
const protectedRoutes = createRouter({ requireAuth: true });

protectedRoutes.get("/protected-by-default", (req, res) =>
  res.json({
    message: "this should be protected by default",
    user: req.user
  })
);

const options = {
  allowCors: true,
  forceJsonResponse: true, // default value
  domain: process.env.DOMAIN,
  routesPrefix: "/", // default value
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
    google: { // you will need to create an configure a Google app for login
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET
    },
    /**
     * If you provide an user model with a method findOrCreate
     * noswbi will call it with the user info provided by Google
     * after succesful login.
     */
    userModel: require("./path/to/your/user/model") // optional
  }
};

const server = createServer([router, protectedRoutes], options);

mongoose.connect(
  "mongodb://localhost:27017/test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    server.listen(3000, () => console.log("running on 3000"));
  }
);
```

## Examples

You can check full examples [here](./examples).
