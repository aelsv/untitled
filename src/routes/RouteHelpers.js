/* @Libs */
import urlLib from 'url';
import isFunction from 'lodash/isFunction';
import { matchPath } from 'react-router-dom';

import createConfig from './config';

export default class RouterHelper {
  constructor() {
    this._routes = createConfig();
  }

  getRoutes() {
    return this._routes;
  }

  /* eslint-disable max-len */
  /*
   * getInitialProps will be called for each matched route.
   * For example for nested route (/parent/child) if for parent 'exact' property is false, will be called
   * getInitialProps for parent (/parent) and for child routes (/parent/child), because without 'exact' parent route matches too
   * */
  /* eslint-enable max-len */
  getInitializeRouteActions(url) {
    const filteredRoutes = this._getFilteredRoutes(url);

    return filteredRoutes.reduce((actions, route) => {
      const { getInitialProps } = route;

      if (isFunction(getInitialProps)) {
        return [...actions, getInitialProps];
      }

      return actions;
    }, []);
  }

  isRouteExists(url) {
    return this._getFilteredRoutes(url).length > 0;
  }

  _getMatchedRoutes(_routes, pathname) {
    let matchedRoutes = [];
    _routes.forEach((item) => {
      const { path, exact, routes } = item;
      const matched = !!path && matchPath(pathname, { exact: !!exact, path });
      if (matched) {
        matchedRoutes.push(item);
      }

      if (routes) {
        const nestedMatch = this._getMatchedRoutes(routes, pathname) || matched;
        if (nestedMatch) {
          matchedRoutes = [...matchedRoutes, ...nestedMatch];
        }
      }

      return matched;
    });

    return matchedRoutes;
  }

  _getFilteredRoutes(url) {
    const { pathname } = urlLib.parse(url);

    return this._getMatchedRoutes(this._routes, pathname);
  }
}
