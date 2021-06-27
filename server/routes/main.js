// @ts-check

import debug from 'debug';

const logApp = debug('app:routes:main');

export default (app) => {
  app
    .get('/', { name: 'root' }, async (req, reply) => {
      if (!req.isAuthenticated()) {
        logApp('Redirect to newSession');
        return reply.redirect(app.reverse('newSession'));
      }
      reply.render('welcome/index', req.user);
      return reply;
    })

    .get('/protected', { name: 'protected', preValidation: app.authenticate }, (req, reply) => {
      if (!req.isAuthenticated()) {
        return reply.redirect(app.reverse('newSession'));
      }
      return reply;
    });

  // .setNotFoundHandler((req, reply) => {
  //   reply.render('errors/404', req.user);
  //   return reply;
  // });
};
