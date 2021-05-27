import React from 'react';
import loadable from '@loadable/component';

/* @Constants */
import { HOME_ROUTES } from './paths';

const loadableOptions = {
  fallback: <div>Loading home page...</div>,
};

const LoadHomePage = loadable(() => import(/* webpackChunkName: "HomePage" */ 'pages/Home'), {
  resolveComponent: (components) => components.HomePage,
  ...loadableOptions,
});

export const HOME = {
  path: HOME_ROUTES.DEFAULT,
  component: LoadHomePage,
  getInitialProps: () => {},
  exact: true,
};
