import _ from 'lodash';
import { Strategy } from 'fastify-passport';
import debug from 'debug';

const logApp = debug('app:FormStrategy');

export default class FormStrategy extends Strategy {
  constructor(name, app) {
    super(name);
    logApp('name %O', name);
    this.app = app;
  }

  async authenticate(request) {
    if (request.isAuthenticated()) {
      logApp('is Used');
      return this.pass();
    }

    const email = _.get(request, 'body.data.email', null);
    logApp('email %O', email);
    const password = _.get(request, 'body.data.password', null);
    logApp('password %O', password);
    const { models } = this.app.objection;
    const user = await models.user.query().findOne({ email });
    logApp('user %O', user);
    if (user && user.verifyPassword(password)) {
      return this.success(user);
    }

    return this.fail();
  }
}
