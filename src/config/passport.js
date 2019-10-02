/* eslint-disable no-underscore-dangle */
const passport = require("passport");
const passportJwt = require("passport-jwt");
const passportGoogle = require("passport-google-oauth20");

// TODO: put this code into a exported function that accepts
// config, so client can pass secret, issuer, audience...
const optionsJwt = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  // jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader(),
  secretOrKey: "aaa",
  issuer: "aaa",
  audience: "aaa"
};

passport.use(
  new passportJwt.Strategy(optionsJwt, (payload, done) => {
    if (!payload) {
      return done();
    }

    const data = {
      id: payload.sub
    };
    return done(null, data, payload);
  })
);

const auth = () => passport.authenticate("jwt", { session: false });

const optionsGoogle = {
  clientID: "aaa",
  clientSecret: "aaa",
  callbackURL: "aaa"
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

/*
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});
*/

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
  auth,
  googleLogin,
  googleLoginRedirect
};
