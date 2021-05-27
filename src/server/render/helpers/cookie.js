import { parse, serialize } from 'cookie';

const SERIALIZE_OPTIONS = {
  DOMAIN: 'domain',
  ENCODE: 'encode',
  EXPIRES: 'expires',
  HTTP_ONLY: 'httpOnly',
  MAX_AGE: 'maxAge',
  PATH: 'path',
  SAME_SITE: 'sameSite',
  SECURE: 'secure',
};

const OPTIONS_WITHOUT_VALUE = [SERIALIZE_OPTIONS.HTTP_ONLY, SERIALIZE_OPTIONS.SECURE];
const CAMEL_CASED_OPTIONS = [SERIALIZE_OPTIONS.HTTP_ONLY, SERIALIZE_OPTIONS.MAX_AGE, SERIALIZE_OPTIONS.SAME_SITE];

export const COOKIE_SEPARATOR = '; ';

export const COOKIE_INDEXES = {
  NAME: 0,
  VALUE: 1,
  OPTIONS: 2,
};

export const serializeCookie = serialize;

/**
 * @param {[]} cookies
 * @returns {string}
 */
export const serializeCookies = (cookies) =>
  cookies
    .map(([name, value, options]) => serialize(name, value, { ...options, encode: (val) => val }))
    .join(COOKIE_SEPARATOR);

const normalizeLoweredOptionName = (loweredName) => {
  const camelCasedOptionIndex = CAMEL_CASED_OPTIONS.findIndex(
    (camelCasedOption) => camelCasedOption.toLowerCase() === loweredName,
  );

  if (camelCasedOptionIndex >= 0) {
    return CAMEL_CASED_OPTIONS[camelCasedOptionIndex];
  }

  return loweredName;
};

const splitCookieProps = (cookie) => {
  const options = { encode: (val) => val };
  const result = [];
  const serializedOptions = Object.values(SERIALIZE_OPTIONS).map((item) => item.toLowerCase());

  Object.entries(cookie).forEach(([name, value]) => {
    const loweredName = name.toLowerCase();

    if (serializedOptions.includes(loweredName)) {
      options[normalizeLoweredOptionName(loweredName)] = value;
    } else {
      result[COOKIE_INDEXES.NAME] = name;
      result[COOKIE_INDEXES.VALUE] = value;
    }
  });

  result[COOKIE_INDEXES.OPTIONS] = options;

  return result;
};

const isCookieIncludesKey = (cookie, key) => cookie.toLowerCase().includes(`${key.toLowerCase()}${COOKIE_SEPARATOR}`);

/**
 * @param {string} cookie
 * @returns {[ name, value, options ]}
 */
export const parseCookie = (cookie) => {
  const parsedCookie = parse(cookie, { decode: (val) => val });

  OPTIONS_WITHOUT_VALUE.forEach((key) => {
    if (isCookieIncludesKey(cookie, key)) {
      parsedCookie[key] = true;
    }
  });

  return splitCookieProps(parsedCookie);
};

export const parseCookies = (cookies = []) => cookies.map(parseCookie);
