/* eslint-disable no-underscore-dangle */
const passport = require("passport");
const passportJwt = require("passport-jwt");
const passportGoogle = require("passport-google-oauth20");

const configureAuth = config => {
  const { domain, routesPrefix, auth } = config;

  const optionsJwt = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    // jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader(),
    secretOrKey: auth.jwtSecret,
    issuer: auth.issuer,
    audience: auth.audience
  };

  passport.use(
    new passportJwt.Strategy(optionsJwt, (payload, done) => {
      if (!payload) {
        return done();
      }

      const data = {
        id: payload.sub,
        name: payload.name,
        email: payload.email
      };
      return done(null, data, payload);
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
        // TODO: find or create user in database
        const user = {
          id: profile.id || profile._json.sub,
          name: profile.displayName || profile._json.name,
          // eslint-disable-next-line prettier/prettier
          email: profile.emails.filter(i => i.verified).find(i => i.value).value || profile._json.email,
        };
        return cb(null, user);
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
