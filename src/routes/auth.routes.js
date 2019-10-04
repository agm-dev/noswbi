const { createRouter } = require("../domain/router");
const { googleLogin, googleLoginRedirect } = require("../config/passport");
const { generateJwt } = require("../utils/tokens");

const generateAuthRouter = jwtConfig => {
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
    console.log("generate token middleware: ", token);
    // res.redirect(`/?access_token=${token}`);
    res.json({ token });
  };

  router.get("/auth/google", googleLogin());
  router.get("/auth/google/callback", googleLoginRedirect(), generateToken);

  return router;
};

module.exports = {
  generateAuthRouter
};
