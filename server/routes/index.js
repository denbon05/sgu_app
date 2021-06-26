// @ts-check

import users from './users.js';
import session from './session.js';
import main from './main.js';
import subjects from './subjects';

const controllers = [
  main,
  users,
  session,
  subjects,
];

export default (app) => controllers.forEach((f) => f(app));
