exports.up = (knex) => (
  knex.schema.createTable('users', (table) => {
    table.string('nickname');
    table.increments('id').primary();
    table.string('email');
    table.string('password_digest');
    table.boolean('is_admin').defaultTo(false);
  })
);

exports.down = (knex) => knex.schema.dropTable('users');
