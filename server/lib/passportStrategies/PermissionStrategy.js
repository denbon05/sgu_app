import { Strategy } from 'fastify-passport';
import debug from 'debug';

const logApp = debug('app:AdminStrategy');

export default class PermissionStrategy extends Strategy {
  constructor(name) {
    super(name);
    logApp('name %O', name);
  }

  async authenticate(request) {
    logApp('is Used');
    if (request.user && request.user.isAdmin()) {
      // return this.pass();
      return this.success();
    }

    return this.fail();
  }
}
