const { createRouter } = require("../domain/router");
const { googleLogin, googleLoginRedirect } = require("../config/passport");
const { generateJwt } = require("../utils/tokens");

const generateAuthRouter = (jwtConfig, redirectUri = "/") => {
  const router = createRouter();

  const generateToken = (req, res) => {
    const payloadFields = jwtConfig.payloadFields
      ? jwtConfig.payloadFields
      : [];
    // eslint-disable-next-line no-underscore-dangle
    const userKeys = Object.keys(req.user._doc);

    const defaultPayload = {
      name: req.user.name,
      email: req.user.email
    };

    // FIXME: extract to utils
    const payload = payloadFields
      .filter(field => userKeys.includes(field))
      .reduce((result, current) => {
        return Object.assign(result, { [current]: req.user[current] });
      }, defaultPayload);

    const token = generateJwt(req.user.id, payload, jwtConfig);

    res.redirect(`${redirectUri}?access_token=${token}`);
  };

  router.get("/auth/google", googleLogin());
  router.get("/auth/google/callback", googleLoginRedirect(), generateToken);

  return router;
};

module.exports = {
  generateAuthRouter
};
