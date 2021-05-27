const fs = require('fs');
const path = require('path');

const { NODE_ENV } = process.env;

delete require.cache[require.resolve('./paths')];

if (!NODE_ENV) {
  throw new Error('The NODE_ENV environment variable is required but was not specified.');
}

const appDirectory = fs.realpathSync(process.cwd());

process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter((folder) => folder && !path.isAbsolute(folder))
  .map((folder) => path.resolve(appDirectory, folder))
  .join(path.delimiter);

const REACT_APP = /^REACT_APP_/i;

function getRawEnv() {
  return Object.keys(process.env)
    .filter((key) => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        const environment = env;

        environment[key] = process.env[key];
        return env;
      },
      {
        IS_DEVELOPMENT: NODE_ENV === 'development',
        IS_PRODUCTION: NODE_ENV === 'production',
        NODE_ENV: process.env.NODE_ENV || 'development',
        SERVER_ENV: process.env.SERVER_ENV,
        RESOURCE_URL_PATH_PREFIX: process.env.RESOURCE_URL_PATH_PREFIX || '',
        NODE_PATH: process.env.NODE_PATH || './src',
      },
    );
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

function getClientEnvironment() {
  const raw = {
    ...getRawEnv(),
    IS_SERVER: false,
  };

  return {
    raw,
    definedPlugin: createDefinePluginEnv(raw),
  };
}

function getServerEnvironment() {
  const raw = {
    ...getRawEnv(),
    SSR_API_HOST: process.env.SSR_API_HOST,
    IS_SERVER: true,
  };

  return {
    raw,
    definedPlugin: createDefinePluginEnv(raw),
  };
}

module.exports = {
  getClientEnvironment,
  getServerEnvironment,
};
