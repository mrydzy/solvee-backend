'use  strict';

module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert('Users',[{
      email: 'test@gmail.com',
      name: 'jan kowalski',
      facebookId: 1234,
      createdAt: "NOW()",
      updatedAt: "NOW()"
    }]
    );
  },

  down: function (queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  }
}