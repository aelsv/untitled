const { NODE_ENV, RESOURCE_URL_PATH_PREFIX } = process.env;

delete require.cache[require.resolve('./paths')];

if (NODE_ENV !== 'production' && NODE_ENV !== 'development') {
  throw new Error('The NODE_ENV environment variable is required but was not specified.');
}

function getRawEnv() {
  return {
    NODE_ENV,
    IS_PRODUCTION: NODE_ENV === 'production',
    IS_DEVELOPMENT: NODE_ENV === 'development',
    RESOURCE_URL_PATH_PREFIX: RESOURCE_URL_PATH_PREFIX || '/',
  };
}

function createDefinePluginEnv(raw) {
  return {
    'process.env': Object.keys(raw).reduce((env, key) => {
      // eslint-disable-next-line no-param-reassign
      env[key] = JSON.stringify(raw[key]);

      return env;
    }, {}),
  };
}

function getEnvironment() {
  const raw = {
    ...getRawEnv(),
  };

  return {
    raw,
    definedPlugin: createDefinePluginEnv(raw),
  };
}

module.exports = {
  getEnvironment,
};
