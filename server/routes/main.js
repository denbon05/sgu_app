export default (app) => {
  app
    .get('/', { name: 'root' }, async (req, reply) => {
      if (!req.isAuthenticated()) {
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
};
