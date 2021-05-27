import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { loadableReady } from '@loadable/component';
import { ConnectedRouter } from 'connected-react-router';
import configureStore from 'reduxStore/store';

/* @Components */
import { App } from 'components/App';

import { IS_DEVELOPMENT } from 'config';

const history = createBrowserHistory();

const store = configureStore(history, window.__INITIAL_STATE__);

const root = document.getElementById('root');

const renderApp = (component) =>
  hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>{component}</ConnectedRouter>
    </Provider>,
    root,
  );

loadableReady(() => renderApp(<App />));

if (module.hot && IS_DEVELOPMENT) {
  module.hot.accept('./reduxStore/store');
}
