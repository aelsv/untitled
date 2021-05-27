export class StatusCodeError extends Error {
  /**
   * @param {string} message
   * @param  {number} status
   */
  constructor(message, status) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, StatusCodeError);
    }

    this.status = status;
  }
}
