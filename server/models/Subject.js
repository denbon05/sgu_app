// @ts-check

import path from 'path';
import { Model } from 'objection';

export default class Subject extends Model {
  $parseJson(json, options) {
    const parsed = super.$parseJson(json, options);
    return {
      ...parsed,
      ...(parsed.name && { name: parsed.name.trim() }),
      ...(parsed.description && { description: parsed.description.trim() }),
      ...(parsed.localization && { localization: parsed.localization.trim() }),
    };
  }

  static get tableName() {
    return 'subjects';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 30 },
        creatorId: { type: 'integer' },
        localization: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    return {
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'User'),
        join: {
          from: 'subjects.creatorId',
          to: 'users.id',
        },
      },
    };
  }
}
