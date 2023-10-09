'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderNumber: {
        type: Sequelize.STRING
      },
      company_id: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.NUMBER
      },
      cliente_id: {
        type: Sequelize.NUMBER
      },
      TotalInvoice: {
        type: Sequelize.FLOAT
      },
      discount: {
        type: Sequelize.FLOAT
      },
      TotalMerchandise: {
        type: Sequelize.FLOAT
      },
      tax: {
        type: Sequelize.FLOAT
      },
      state: {
        type: Sequelize.STRING
      },
      DateOrder: {
        type: Sequelize.DATE
      },
      DateDue: {
        type: Sequelize.DATE
      },
      RestPayable: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Invoices');
  }
};