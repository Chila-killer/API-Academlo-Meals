'use strict';

const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('restaurants', [
      {
        name: 'Cocina de Mama Pancha',
        address: '1234 ABC col.XYZ',
        rating: 4,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      },
      {
        name: 'Crustáceo Cascarudo',
        address: '1234 ABC col.XYZ',
        rating: 5,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      },
      {
        name: 'Doña Pelos Foods',
        address: '1234 ABC col.XYZ',
        rating: 3,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      },
      {
        name: 'El Changarro',
        address: '1234 ABC col.XYZ',
        rating: 2,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      },
      {
        name: 'Tacos don Mencho',
        address: '1234 ABC col.XYZ',
        rating: 1,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('restaurants', null, {});
  }
};
