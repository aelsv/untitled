import regexp from 'common/regexp';

export const isHomePage = (path) => !!regexp.HOME_PAGE.exec(path);
