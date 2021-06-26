exports.up = (knex) => (
  knex.schema.createTable('subjects', (table) => {
    table.string('name');
    table.string('localization');
    table.increments('id').primary();
    table.integer('creator_id').references('id').inTable('users');
  })
);

exports.down = (knex) => knex.schema.dropTable('subjects');
