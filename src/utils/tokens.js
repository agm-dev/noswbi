const jwt = require("jsonwebtoken");

const generateJwt = (userId, payload) => {
  const expiresIn = "1 hour";
  const issuer = "";
  const audience = "";
  const secret = "";
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
