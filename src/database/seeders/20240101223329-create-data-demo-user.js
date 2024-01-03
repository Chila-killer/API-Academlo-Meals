'use strict';

const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [
      {
        name: 'User A',
        email: 'user@email.com',
        password: "1234567890",
        role: 'admin',
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      },
      {
        name: 'User B',
        email: 'user2@email.com',
        password: "1234567890",
        role: 'admin',
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      },
      {
        name: 'User C',
        email: 'user3@email.com',
        password: "1234567890",
        role: 'admin',
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      },
      {
        name: 'User D',
        email: 'user4@email.com',
        password: "1234567890",
        role: 'normal',
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      },
      {
        name: 'User F',
        email: 'user5@email.com',
        password: "1234567890",
        role: 'normal',
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
