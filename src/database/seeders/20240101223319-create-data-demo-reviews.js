'use strict';

const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('reviews', [
      {
        user_id: 2,
        comment: 'Uy que rico ñam ñam ☺',
        restaurant_id: 1,
        rating: 4,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      },
      {
        user_id: 1,
        comment: 'Uy que askoooo 🤢',
        restaurant_id: 2,
        rating: 1,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      },
      {
        user_id: 3,
        comment: 'Ewk wakala 🤮',
        restaurant_id: 4,
        rating: 2,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      },
      {
        user_id: 4,
        comment: 'Delicious 😋',
        restaurant_id: 3,
        rating: 5,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      },
      {
        user_id: 5,
        comment: 'Hay mejores hay peores 😑',
        restaurant_id: 5,
        rating: 3,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reviews', null, {});
  }
};
