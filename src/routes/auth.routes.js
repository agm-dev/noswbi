const { createRouter } = require("../domain/router");
const { googleLogin, googleLoginRedirect } = require("../config/passport");
const { generateJwt } = require("../utils/tokens");

const generateAuthRouter = jwtConfig => {
  const router = createRouter();

  router.get("/auth/google", googleLogin());
  router.get("/auth/google/callback", googleLoginRedirect(), (req, res) => {
    res.json({
      token: generateJwt(req.user.id, {}, jwtConfig)
    });
  });

  return router;
};

module.exports = {
  generateAuthRouter
};
