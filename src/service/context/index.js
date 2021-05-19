let context = {};

export const addToContext = (newContext) => {
  context = {
    ...context,
    ...newContext,
  };
};

export const getContextValue = (name) => context[name];

export const getAllContext = () => context;

const { NODE_ENV } = process.env;

const IS_PRODUCTION_BUILD = NODE_ENV === 'production';
const IS_DEVELOPMENT_BUILD = NODE_ENV === 'development';

export const initServerContext = (vars = {}) => {
  if (!vars.SSR_API_HOST) {
    throw new Error('SSR_API_HOST is not exists');
  }

  if (!vars.SERVER_ENV) {
    throw new Error('SERVER_ENV gotta be set up as a process variable');
  }

  if (!vars.RESOURCE_URL_PATH_PREFIX) {
    throw new Error('RESOURCE_URL_PATH_PREFIX gotta be set up');
  }

  addToContext({
    IS_PRODUCTION_BUILD,
    IS_DEVELOPMENT_BUILD,
    SSR_API_HOST: vars.SSR_API_HOST,
    SERVER_ENV: vars.SERVER_ENV,
    RESOURCE_URL_PATH_PREFIX: vars.RESOURCE_URL_PATH_PREFIX || '',
    IS_SERVER: true,
  });
};

export const initClientContext = (vars = {}) => {
  if (!vars.RESOURCE_URL_PATH_PREFIX) {
    throw new Error('RESOURCE_URL_PATH_PREFIX must be set!');
  }

  addToContext({
    IS_PRODUCTION_BUILD,
    IS_DEVELOPMENT_BUILD,
    IS_SERVER: false,
    SERVER_ENV: vars.SERVER_ENV,
    RESOURCE_URL_PATH_PREFIX: vars.RESOURCE_URL_PATH_PREFIX || '',
  });
};
