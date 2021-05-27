/* @Constants */
import { SET_LANGUAGE, STATUS_CODES } from './constants';

/**
 * Action
 * Update status code (use in server only)
 *
 * @param {number} statusCode - server status code
 */
export const updateStatusCode = (statusCode) => ({
  type: STATUS_CODES.UPDATE,
  payload: {
    statusCode,
  },
});

/**
 * Action
 * Change language in app
 *
 * @param { string } language - app language
 */
export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language,
});
