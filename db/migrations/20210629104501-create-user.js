'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', [
      {
        id: '44a6619e-f6c3-423a-b669-a7831e7f4013',
        username: 'John',
        password: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', {
      id: '44a6619e-f6c3-423a-b669-a7831e7f4013',
    });
  },
};
