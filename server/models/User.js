// @ts-check

import { Model } from 'objection';
import objectionUnique from 'objection-unique';
import path from 'path';

import encrypt from '../lib/secure.js';

const unique = objectionUnique({ fields: ['email', 'nickname'] });

export default class User extends unique(Model) {
  $parseJson(json, options) {
    const parsed = super.$parseJson(json, options);
    return {
      ...parsed,
      ...(parsed.nickname && { name: parsed.nickname.trim() }),
      ...(parsed.email && { name: parsed.email.trim() }),
      ...(parsed.password && { name: parsed.password.trim() }),
      ...(parsed.isAdmin && { name: parsed.isAdmin.trim() }),
    };
  }

  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['password', 'email', 'nickname'],
      properties: {
        id: { type: 'integer' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 3 },
        nickname: { type: 'string', minLength: 1, maxLength: 20 },
        isAdmin: { type: 'boolean' },
      },
    };
  }

  set password(value) {
    this.passwordDigest = encrypt(value);
  }

  get name() {
    return this.nickname;
  }

  verifyPassword(password) {
    return encrypt(password) === this.passwordDigest;
  }

  static get relationMappings() {
    return {
      tasks: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, 'Subject'),
        join: {
          from: 'users.id',
          to: 'subjects.creatorId',
        },
      },
    };
  }
}
