import { ERROR_CODES } from 'constants/errorCodes';

export class CustomError extends Error {
  /**
   * @param {string} message
   * @param {number} errorId
   * @param {{}} extra
   */
  constructor(message = '', errorId = ERROR_CODES.UNKNOWN, extra = {}) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }

    this.errorId = errorId;
    this.extra = extra;
  }
}
