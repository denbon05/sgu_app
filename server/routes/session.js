// @ts-check

import i18next from 'i18next';
import debug from 'debug';

const logApp = debug('app:routes:session');

export default (app) => {
  app
    .get('/session/new', { name: 'newSession' }, (req, reply) => {
      const user = new app.objection.models.user();
      logApp('user %O', user);
      reply.render('session/new', { user });
    })

    .post('/session', { name: 'session' }, app.fp.authenticate('form', async (req, reply, err, userData) => {
      logApp('POST session err %O', err);
      // logApp('POST session userData %O', userData)
      if (err) return app.httpErrors.internalServerError(err);
      logApp('POST session req.body.data %O', req.body.data);

      if (!userData) {
        const user = new app.objection.models.user().$set(req.body.data);
        logApp('POST session user %O', user);
        const errors = {
          email: [{ message: i18next.t('flash.session.create.error') }],
        };
        return reply.render('session/new', { user, errors });
      }
      await req.logIn(userData);
      logApp('User is logined');
      req.flash('success', i18next.t('flash.session.create.success'));
      return reply.redirect(app.reverse('root'));
    }))

    .delete('/session', (req, reply) => {
      req.logOut();
      req.flash('info', i18next.t('flash.session.delete.success'));
      reply.redirect(app.reverse('root'));
    });
};
