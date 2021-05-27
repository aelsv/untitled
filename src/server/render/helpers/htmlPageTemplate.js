import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';

export const createHtmlPage = (renderedApp, extractor, store) => {
  const head = Helmet.rewind();
  const appState = store.getState();
  const { htmlLang } = appState.app;

  return `<!doctype html>
    <html lang="${htmlLang}" translate="no">
      <head>
        <meta charSet="utf-8" />
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.link.toString()}
        ${head.meta.toString()}
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=5" />
        <meta property="og:type" content="website" />
        <meta name="format-detection" content="telephone=no">
        ${extractor.getStyleTags()}
      </head>
      <body>
        <div id="root">${renderedApp}</div>
        <script charSet="UTF-8">
        window.__INITIAL_STATE__=${serialize(appState, { isJSON: true })}
        </script>
        ${extractor.getScriptTags()}
      </body>
    </html>`.replace(/(\t|\n)/g, '');
};
