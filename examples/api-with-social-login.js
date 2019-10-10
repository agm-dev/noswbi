// check env vars are defined

const requiredEnvVars = [
  "JWT_SECRET",
  "JWT_ISSUER",
  "JWT_AUDIENCE",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_SECRET"
];

requiredEnvVars.forEach(i => {
  if (typeof process.env[i] === "undefined") {
    // eslint-disable-next-line no-console
    console.log("Check and provide required env vars");
    process.exit(1);
  }
});

// example:

const { createRouter, createServer } = require("../index");

const router = createRouter();
const protectedRoutes = createRouter({ requireAuth: true });

router.get("/", (req, res) => res.send("holi"));

protectedRoutes.get("/supersecret", (req, res) =>
  res.json({
    message: "this should be protected by default",
    user: req.user
  })
);

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
    },
    loginRedirection: "http://localhost:3000/api/"
  }
};

const server = createServer([router, protectedRoutes], options);

// eslint-disable-next-line no-console
server.listen(3000, () => console.log("running on 3000"));
