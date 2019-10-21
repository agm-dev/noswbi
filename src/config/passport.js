/* eslint-disable no-underscore-dangle */
const passport = require("passport");
const passportJwt = require("passport-jwt");
const passportGoogle = require("passport-google-oauth20");

const configureAuth = config => {
  const { domain, routesPrefix, auth } = config;

  const optionsJwt = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: auth.jwtSecret,
    issuer: auth.issuer,
    audience: auth.audience
  };

  passport.use(
    new passportJwt.Strategy(optionsJwt, (payload, done) => {
      if (!payload) {
        return done();
      }

      const payloadFields = auth.payloadFields ? auth.payloadFields : [];

      const defaultData = {
        id: payload.sub,
        name: payload.name,
        email: payload.email
      };

      // FIXME: extract to utils
      const extraData = payloadFields
        .filter(field => Object.keys(payload).includes(field))
        .reduce((result, current) => {
          return Object.assign(result, { [current]: payload[current] });
        }, defaultData);

      return done(null, Object.assign(defaultData, extraData), payload);
    })
  );

  const optionsGoogle = {
    clientID: auth.google.clientID,
    clientSecret: auth.google.clientSecret,
    callbackURL: `${domain}${routesPrefix || ""}/auth/google/callback`
  };

  passport.use(
    new passportGoogle.Strategy(
      optionsGoogle,
      (accessToken, refreshToken, profile, cb) => {
        const user = {
          id: profile.id || profile._json.sub,
          name: profile.displayName || profile._json.name,
          // eslint-disable-next-line prettier/prettier
          email: profile.emails.filter(i => i.verified).find(i => i.value).value || profile._json.email,
        };

        const { userModel } = auth;
        if (!userModel || typeof userModel.findOrCreate === "undefined") {
          return cb(null, user);
        }

        // use the userModel to find or create the user
        return userModel
          .findOrCreate(user)
          .then(dbUser => cb(null, dbUser))
          .catch(err => cb(err));
      }
    )
  );
};

const auth = () => passport.authenticate("jwt", { session: false });

const googleLogin = () =>
  passport.authenticate("google", {
    session: false,
    scope: ["openid", "profile", "email"]
  });

const googleLoginRedirect = () =>
  passport.authenticate("google", {
    session: false
  });

module.exports = {
  passport,
  configureAuth,
  auth,
  googleLogin,
  googleLoginRedirect
};
