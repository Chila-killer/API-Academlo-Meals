'use strict';

const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('orders', [
      {
        meal_id: 2,
        user_id: 3,
        totalPrice: 15,
        quantity: 1,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      },
      {
        meal_id: 4,
        user_id: 5,
        totalPrice: 45,
        quantity: 3,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      },
      {
        meal_id: 1,
        user_id: 1,
        totalPrice: 55,
        quantity: 2,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      },
      {
        meal_id: 3,
        user_id: 2,
        totalPrice: 115,
        quantity: 3,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      },
      {
        meal_id: 5,
        user_id: 4,
        totalPrice: 50,
        quantity: 2,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orders', null, {});
  }
};
