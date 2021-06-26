import {
  describe, beforeAll, it, expect, afterAll, beforeEach, afterEach,
} from '@jest/globals';
import getApp from '../server/index.js';
import { getTestData, prepareData, signIn } from './helpers/index.js';

describe('subjects CRUD', () => {
  let app;
  let knex;
  let models;
  let cookie;
  const testData = getTestData();

  beforeAll(async () => {
    app = await getApp();
    knex = app.objection.knex;
    models = app.objection.models;
  });

  beforeEach(async () => {
    await knex.migrate.latest();
    await prepareData(app);
    cookie = await signIn(app, testData.users.existing);
  });

  it('GET /subjects', async () => {
    const response = await app.inject({
      method: 'GET',
      cookies: cookie,
      url: app.reverse('subjects'),
    });
    expect(response.statusCode).toBe(200);
  });

  it('GET /subjects/new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newSubject'),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('POST /subjects', async () => {
    const newSubjectData = testData.subjects.new;

    const response = await app.inject({
      method: 'POST',
      url: app.reverse('subjects'),
      cookies: cookie,
      payload: {
        data: newSubjectData,
      },
    });

    expect(response.statusCode).toBe(302);

    const subject = await models.subject.query().findOne({ name: newSubjectData.name });
    expect(subject).toMatchObject(newSubjectData);
  });

  afterEach(async () => {
    await knex.migrate.rollback();
  });

  afterAll(() => {
    app.close();
  });
});
