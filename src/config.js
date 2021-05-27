import { addToContext, getContextValue } from './service/context';

/* Contains info about current server environment */
export const { NODE_ENV, IS_SERVER } = process.env;
export const IS_DEVELOPMENT = NODE_ENV === 'development';
export const IS_PRODUCTION = NODE_ENV === 'production';

/**
 * Using this for:
 * adding base url in router
 * adding prefix to resources
 * adding prefix to svg sprite
 */
export const RESOURCE_URL_PATH_PREFIX = process.env.RESOURCE_URL_PATH_PREFIX || '';
const { SSR_API_HOST } = process.env;

/**
 * @param {{}} vars
 */
export const initServerVars = (vars = {}) => {
  if (!IS_SERVER) {
    throw new Error('Could not set up SERVER_VARS in server env!');
  }

  if (IS_DEVELOPMENT && !SSR_API_HOST) {
    throw new Error('SSR_API_HOST is not exists!');
  }

  if (IS_PRODUCTION && !vars.SSR_API_HOST) {
    throw new Error('SSR_API_HOST is not exists!');
  }

  addToContext({
    SSR_API_HOST: vars.SSR_API_HOST || SSR_API_HOST,
  });
};

/**
 * @returns {string}
 */
export const getExternalApiHost = () => {
  if (IS_SERVER) {
    return getContextValue('SSR_API_HOST');
  }

  return '';
};
