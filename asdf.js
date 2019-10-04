const { createRouter, createServer, auth } = require("./index");

const router = createRouter();
const protectedRoutes = createRouter({ requireAuth: true });

router.get("/", (req, res) => res.send("holi"));
router.get("/protected", auth(), (req, res) =>
  res.json({
    message: "protected!",
    user: req.user || {}
  })
);

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
    }
  }
};

const server = createServer([router, protectedRoutes], options);

// eslint-disable-next-line no-console
server.listen(3000, () => console.log("running on 3000"));
