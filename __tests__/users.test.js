import _ from 'lodash';
import {
  describe, beforeAll, it, expect, afterAll, beforeEach, afterEach,
} from '@jest/globals';
import getApp from '../server/index.js';
import encrypt from '../server/lib/secure.js';
import { getTestData, prepareData, signIn } from './helpers/index.js';

describe('users CRUD', () => {
  let app;
  let knex;
  let models;
  let cookie;
  const testData = getTestData();

  const exitedUser = testData.users.existing;

  beforeAll(async () => {
    app = await getApp();
    knex = app.objection.knex;
    models = app.objection.models;
  });

  beforeEach(async () => {
    await knex.migrate.latest();
    await prepareData(app);
    cookie = await signIn(app, testData.users.admin);
  });

  it('GET /users', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('users'),
    });

    expect(response.statusCode).toBe(302);
  });

  it('GET /users as admin', async () => {
    const response = await app.inject({
      method: 'GET',
      cookies: cookie,
      url: app.reverse('users'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('GET /users/new', async () => {
    const response = await app.inject({
      method: 'GET',
      cookies: cookie,
      url: app.reverse('newUser'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('POST /users', async () => {
    const newUserData = testData.users.new;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('users'),
      cookies: cookie,
      payload: {
        data: newUserData,
      },
    });
    expect(response.statusCode).toBe(302);

    const expected = {
      ..._.omit(newUserData, 'password'),
      passwordDigest: encrypt(newUserData.password),
    };
    const user = await models.user.query().findOne({ email: newUserData.email });
    expect(user).toMatchObject(expected);
  });

  it('Delete users', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('deleteUser', { id: exitedUser.id }),
      cookies: cookie,
    });
    expect(response.statusCode).toBe(302);

    const user = await models.user.query().findById(exitedUser.id);
    expect(user).toBeUndefined();
  });

  afterEach(async () => {
    await knex.migrate.rollback();
  });

  afterAll(() => {
    app.close();
  });
});
