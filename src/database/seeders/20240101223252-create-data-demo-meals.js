'use strict';

const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('meals', [
      {
        name: 'Tacoshando',
        price: 27.5,
        restaurant_id: 1,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      },
      {
        name: 'Chilakillers',
        price: 15,
        restaurant_id: 2,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      },
      {
        name: 'Gorditas Calientes mmmm',
        price: 38.33,
        restaurant_id: 3,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      },
      {
        name: 'HotDogos',
        price: 15,
        restaurant_id: 4,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      },
      {
        name: 'Higado en su jugo',
        price: 25,
        restaurant_id: 5,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('meals', null, {});
  }
};
