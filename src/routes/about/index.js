import React from 'react';
import loadable from '@loadable/component';

/* @Constants */
import { ABOUT_ROUTES } from './paths';

const loadableOptions = {
  fallback: <div>Loading about page...</div>,
};

const LoadContactsPage = loadable(() => import(/* webpackChunkName: "AboutPage" */ 'pages/About'), {
  resolveComponent: (components) => components.AboutPage,
  ...loadableOptions,
});

export const ABOUT = {
  path: ABOUT_ROUTES.DEFAULT,
  component: LoadContactsPage,
  getInitialProps: () => {},
  exact: true,
};
