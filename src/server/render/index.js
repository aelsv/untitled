import HttpStatus from 'http-status-codes';
import { createMemoryHistory } from 'history';
import configureStore from '../../reduxStore/store';

/* @Constants */
import { initServerVars } from 'config';
import { isSsrRedirectError, isNotModifiedError, isNotFoundError } from 'utils/ErrorCreator';

/* @Helpers */
import { renderHtml } from './helpers/renderHtml';
import parseRequestOptions from './helpers/parseRequestOptions';

const addLastModifiedHeader = (res, serverOptions) => {
  const lastModifiedHeaderValue = serverOptions.headers.headers['last-modified'];

  if (!!lastModifiedHeaderValue) {
    res.setHeader('Last-Modified', lastModifiedHeaderValue);
  }
};

const getRenderHtml = () => renderHtml;

export default ({ env = {} }) =>
  async (req, res) => {
  initServerVars(env);

  const context = {};

  const { serverOptions, originalUrl } = parseRequestOptions(req);

  const history = createMemoryHistory({ initialEntries: [originalUrl] });

  const store = configureStore(history);

  try {
    addLastModifiedHeader(res, serverOptions);
  } catch (error) {
    if (isSsrRedirectError(error)) {
      return res.redirect(error.extra.httpCode, error.extra.url);
    }

    if (isNotModifiedError(error)) {
      addLastModifiedHeader(res, serverOptions);

      return res.status(HttpStatus.NOT_MODIFIED).send();
    }

    if (isNotFoundError(error)) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }
  }

  const html = getRenderHtml(env)(store, originalUrl, context);

  return res.status(200).send(html);
};
