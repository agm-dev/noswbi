const { createRouter } = require("../domain/router");
const { googleLogin, googleLoginRedirect } = require("../config/passport");
const { generateJwt } = require("../utils/tokens");

const generateAuthRouter = (jwtConfig, redirectUri = "/") => {
  const router = createRouter();

  const generateToken = (req, res) => {
    const token = generateJwt(
      req.user.id,
      {
        name: req.user.name,
        email: req.user.email
      },
      jwtConfig
    );

    res.redirect(`${redirectUri}?access_token=${token}`);
  };

  router.get("/auth/google", googleLogin());
  router.get("/auth/google/callback", googleLoginRedirect(), generateToken);

  return router;
};

module.exports = {
  generateAuthRouter
};
