/* @Libs */
import url from 'url';
import HeadersTransporter from './HeadersTransporter';

/**
 * @param {Request} request - express request
 * @return {{serverOptions: object, originalUrl: string, searchString: string}}
 */
export default function parseRequestOption(request) {
  const { originalUrl, hostname } = request;

  const serverOptions = {
    headers: new HeadersTransporter(request),
  };

  const { search } = url.parse(originalUrl);
  const searchString = !!search ? search : '';

  return {
    serverOptions,
    originalUrl,
    searchString,
    hostname,
  };
}
