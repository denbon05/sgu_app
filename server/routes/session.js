// @ts-check

import i18next from 'i18next';
import debug from 'debug';

const logApp = debug('app:routes:session');

export default (app) => {
  app
    .get('/session/new', { name: 'newSession' }, (req, reply) => {
      const user = new app.objection.models.user();
      reply.render('session/new', { user });
    })

    .post('/session', { name: 'session' }, app.fp.authenticate('form', async (req, reply, err, userData) => {
      if (err) return app.httpErrors.internalServerError(err);
      const user = new app.objection.models.user().$set(req.body.data);
      const requiredFields = ['email', 'nickname', 'password'];
      logApp('POST session user from bd %O', user);
      if (requiredFields.length > Object.keys(req.body.data).filter((item) => item).length) {
        const errors = requiredFields
          .reduce((acc, fieldName) => {
            if (req.body.data[fieldName]) return acc;
            return {
              [fieldName]: [{
                keyword: fieldName === 'email' ? 'format' : 'minLength',
                message: fieldName === 'nickname' ? '1' : '3',
              }],
              ...acc,
            };
          }, {});
        return reply.render('session/new', { user, errors });
      }
      await req.logIn(userData);
      logApp('User is logined');
      req.flash('success', i18next.t('flash.session.create.success'));
      return reply.redirect(app.reverse('root', user));
    }))

    .delete('/session', (req, reply) => {
      req.logOut();
      req.flash('info', i18next.t('flash.session.delete.success'));
      reply.redirect(app.reverse('root'));
    });
};
