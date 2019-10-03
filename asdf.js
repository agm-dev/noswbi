const { createRouter, createServer } = require("./index");

const router = createRouter();

router.get("/", (req, res) => res.send("holi"));

const options = {
  allowCors: true,
  forceJsonResponse: true,
  domain: process.env.DOMAIN,
  routesPrefix: "/api",
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }
  }
};

const server = createServer(router, options);

// eslint-disable-next-line no-console
server.listen(3000, () => console.log("running on 3000"));
