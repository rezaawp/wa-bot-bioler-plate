"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.addColumn(
      "Fiturs",
      "is_aktif",
      Sequelize.BOOLEAN
    );
  },
  async down(queryInterface, Sequelize) {
    return await queryInterface.removeColumn("Fiturs", "is_aktif");
  },
};
