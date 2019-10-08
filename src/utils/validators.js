exports.validateConfigAuth = config => {
  const hasDomain = config && config.domain && config.domain.length;
  const hasAuth = config && config.auth;
  if (!hasDomain || !hasAuth) {
    return false;
  }

  const { jwtSecret, issuer, audience, google } = config.auth;
  const hasAuthData =
    jwtSecret &&
    jwtSecret.length &&
    issuer &&
    issuer.length &&
    audience &&
    audience.length &&
    google &&
    google.clientID &&
    google.clientID.length &&
    google.clientSecret &&
    google.clientSecret.length;
  return hasDomain && hasAuth && hasAuthData;
};

exports.validateRouter = routers => {
  if (!Array.isArray(routers)) {
    return [routers];
  }
  return routers;
};
