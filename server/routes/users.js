// @ts-check

import i18next from 'i18next';
import debug from 'debug';

const logApp = debug('app:routes:users');

export default (app) => {
  app
    .get('/users', { preValidation: app.authorize }, async (req, reply) => {
      logApp('GET users req.user.isAdmin %O', req.user.isAdmin);
      const users = await app.objection.models.user.query();
      reply.render('users/index', { users });
      return reply;
    })

    .get('/users/new', { name: 'newUser', preValidation: app.authorize }, (req, reply) => {
      logApp('GET users/new');
      const user = new app.objection.models.user();
      reply.render('users/new', { user });
    })

    .post('/users', { name: 'users', preValidation: app.authorize }, async (req, reply) => {
      try {
        logApp('POST /users req.body.data %O', req.body.data);
        const user = await app.objection.models.user.fromJson(req.body.data);
        logApp('Created user in db %O', user);
        await app.objection.models.user.query().insert(user);
        req.flash('info', i18next.t('flash.users.create.success'));
        reply.redirect(app.reverse('users'));
      } catch (err) {
        logApp('post error %O', err);
        const user = new app.objection.models.user().$set(req.body.data);
        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/new', { user, errors: err.data });
        reply.code(403);
      }
      return reply;
    })

    .delete('/users/:id', {
      name: 'deleteUser',
      preValidation: app.authorize,
    }, async (req, reply) => {
      logApp('DELETE USER');
      try {
        if (req.user.id === req.params.id) req.logOut();
        await app.objection.models.user.query().deleteById(req.params.id);
        req.flash('info', i18next.t('flash.users.delete.success'));
        reply.redirect(app.reverse('users'));
      } catch (err) {
        req.flash('error', i18next.t('flash.users.delete.error'));
        reply.redirect('/users');
      }
      return reply;
    });
};
