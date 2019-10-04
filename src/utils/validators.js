exports.validateConfigAuth = config => {
  // TODO: do something here
  return config && config.domain && config.auth; // FIXME:
};

exports.validateRouter = routers => {
  if (!Array.isArray(routers)) {
    return [routers];
  }
  return routers;
};
