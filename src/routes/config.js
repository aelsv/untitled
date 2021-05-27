/* @Pages */
import { NotFound } from 'pages/NotFound';

/* Routes */
import { HOME } from './home';
import { ABOUT } from './about';

export default () => [
  HOME,
  ABOUT,
  {
    component: NotFound,
  },
];
