const jwt = require("jsonwebtoken");

const generateJwt = (userId, payload, { secret, issuer, audience }) => {
  const expiresIn = "1 hour";
  return jwt.sign(payload, secret, {
    expiresIn,
    issuer,
    audience,
    subject: userId.toString()
  });
};

module.exports = {
  generateJwt
};
