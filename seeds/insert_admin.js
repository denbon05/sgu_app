exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([ // ! for demonstration only, not used in production
        {
          nickname: 'admin',
          email: 'admin@gmail.com',
          password_digest: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
          is_admin: true,
        }
      ]);
    });
};
