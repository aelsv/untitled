import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

/* @Config */
import { IS_DEVELOPMENT } from 'config';

/* @Reducers */
import { rootReducer } from './rootReducer';

export default (history, preloadedState = {}) => {
  const store = configureStore({
    reducer: rootReducer(history),
    middleware: [
      routerMiddleware(history),
      ...getDefaultMiddleware(),
      ...(IS_DEVELOPMENT && [createLogger({ collapsed: true })]),
    ],
    preloadedState,
    devTools: IS_DEVELOPMENT && typeof window !== 'undefined',
  });

  if (IS_DEVELOPMENT && module.hot) {
    module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer(history)));
  }

  return store;
};
