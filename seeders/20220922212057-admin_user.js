'use strict';
require('dotenv').config()
const bcrypt = require('bcrypt')
const date = new Date()

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users',[{
      email: 'admin@admin.com',
      password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
      isAdmin: true,
      createdAt: date,
      updatedAt: date
    }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
