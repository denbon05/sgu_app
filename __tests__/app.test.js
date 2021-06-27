import {
  describe, beforeAll, it, expect, afterAll, beforeEach, afterEach,
} from '@jest/globals';
import getApp from '../server/index.js';
import { getTestData, prepareData, signIn } from './helpers/index.js';

describe('main paths', () => {
  let app;
  let knex;
  let cookie;
  const testData = getTestData();

  beforeAll(async () => {
    app = await getApp();
    knex = app.objection.knex;
  });

  beforeEach(async () => {
    await knex.migrate.latest();
    await prepareData(app);
    cookie = signIn(app, testData.users.admin);
  });

  it('GET /', async () => {
    const res = await app.inject({
      method: 'GET',
      cookies: cookie,
      url: app.reverse('root'),
    });
    expect(res.statusCode).toBe(302);
  });

  it('GET /wrong-path', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/wrong-path',
    });
    expect(res.statusCode).toBe(404);
  });

  afterEach(async () => {
    await knex.migrate.rollback(); // * rollback migrations
  });

  afterAll(() => {
    app.close();
  });
});
