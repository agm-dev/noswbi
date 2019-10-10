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
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require("mongoose");
const { createRouter, createServer } = require("../index");

// db model
const userSchema = new mongoose.Schema({
  id: "string",
  name: "string",
  email: "string"
});

// create the method required by Noswbi
userSchema.statics.findOrCreate = async function findOrCreate(userData) {
  const self = this;
  const user = await self.findOne({ id: userData.id });
  if (user) {
    return user;
  }
  const newUser = await self.create(userData);
  return newUser;
};

const User = mongoose.model("User", userSchema);

// then create the server as usual
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
    loginRedirection: "http://localhost:3000/api/",
    userModel: User
  }
};

const server = createServer([router, protectedRoutes], options);

const mongodbUri = "mongodb://localhost:27017/test";
mongoose.connect(
  mongodbUri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      process.exit(1);
    }
    // eslint-disable-next-line no-console
    server.listen(3000, () => console.log("running on 3000"));
  }
);
