// @ts-check

import i18next from 'i18next';
import debug from 'debug';

const logApp = debug('app:routes:subjects');

export default (app) => {
  app
    .get('/subjects', { name: 'subjects' }, async (req, reply) => {
      const subjects = await app.objection.models.subject.query()
        .withGraphJoined('[creator]');
      logApp('GET subjects subjects %O', subjects);
      reply.render('subjects/index', { subjects });
      return reply;
    })

    .get('/subjects/new', { name: 'newSubject', preValidation: app.authenticate }, async (req, reply) => {
      const subject = await new app.objection.models.subject();
      logApp('GET subject/new subject %O', subject);
      reply.render('subjects/new', { subject });
      return reply;
    })

    .post('/subjects', { name: 'createSubject' }, async (req, reply) => {
      logApp('post data %O', req.body.data);
      try {
        const subject = await app.objection.models.subject.fromJson({
          ...req.body.data,
          creatorId: req.user.id,
        });
        logApp('subject %O', subject);
        await app.objection.models.subject.query().insert(subject);
        req.flash('info', i18next.t('flash.subjects.create.success'));
        reply.redirect(app.reverse('subjects'));
      } catch ({ data }) {
        logApp('post error %O', data);
        req.flash('error', i18next.t('flash.subjects.create.error'));
        const subject = new app.objection.models.subject().$set(req.body.data);
        reply.render(app.reverse('newSubject'), {
          subject, errors: data,
        });
        reply.code(422);
      }
      return reply;
    });
};
