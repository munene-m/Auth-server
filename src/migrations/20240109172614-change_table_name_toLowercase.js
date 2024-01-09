"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable("Users", "users");
    // If you have foreign keys or other dependencies, you might need to update them as well
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable("users", "Users");
    // If you have foreign keys or other dependencies, you might need to update them as well
  },
};
