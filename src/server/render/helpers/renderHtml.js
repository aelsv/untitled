import React from 'react';
import path from 'path';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';

/* @Containers */
import { App } from 'components/App';

/* @Helpers */
import { createHtmlPage } from './htmlPageTemplate';

const statsFile = path.resolve('build/loadable-stats.json');

/**
 * @param {object} store - redux store
 * @param {string} url - request url
 * @param {object} context - router context
 * @returns {string}
 */
export const renderHtml = (store, url, context) => {
  const extractor = new ChunkExtractor({ statsFile, entrypoints: ['app'] });

  const jsx = extractor.collectChunks(
    <Provider store={store}>
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    </Provider>,
  );

  const renderedApp = renderToString(jsx);

  const html = createHtmlPage(renderedApp, extractor, store);

  Helmet.renderStatic();

  return html;
};
