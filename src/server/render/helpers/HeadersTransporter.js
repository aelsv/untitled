import { uniqBy } from 'lodash';
import { COOKIE_INDEXES, serializeCookies, parseCookies, COOKIE_SEPARATOR } from './cookie';

export default class HeadersTransporter {
  constructor(request) {
    const { originalUrl, headers, hostname, protocol } = request;

    this.headers = {
      ...headers,
      referrer: `${protocol}://${hostname}${originalUrl}`,
    };
    this.setCookie = [];
  }

  getHeaders() {
    this._updateHeadersWithSetCookie();

    return this.headers;
  }

  /**
   * @returns {[name, value, options][]}
   */
  getSetCookie() {
    return this.setCookie;
  }

  /**
   * @param {string[]} cookies
   */
  updateCookie(cookies) {
    this.setCookie = uniqBy([...parseCookies(cookies), ...this.setCookie], COOKIE_INDEXES.NAME);
  }

  _updateHeadersWithSetCookie() {
    const parsedCookie = parseCookies(this.headers.cookie ? this.headers.cookie.split(COOKIE_SEPARATOR) : []);
    const mergedCookieWithoutOptions = [...parsedCookie, ...this.setCookie].map(([name, value]) => [name, value]);

    this.headers.cookie = serializeCookies(mergedCookieWithoutOptions);
  }
}
