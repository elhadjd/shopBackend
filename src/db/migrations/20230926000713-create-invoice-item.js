'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InvoiceItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoice_id: {
        type: Sequelize.NUMBER
      },
      produtos_id: {
        type: Sequelize.NUMBER
      },
      armagen_id: {
        type: Sequelize.NUMBER
      },
      quantity: {
        type: Sequelize.NUMBER
      },
      PriceCost: {
        type: Sequelize.FLOAT
      },
      PriceSold: {
        type: Sequelize.FLOAT
      },
      Discount: {
        type: Sequelize.FLOAT
      },
      tax: {
        type: Sequelize.FLOAT
      },
      totalTax: {
        type: Sequelize.FLOAT
      },
      TotalDiscount: {
        type: Sequelize.FLOAT
      },
      final_price: {
        type: Sequelize.FLOAT
      },
      TotalCost: {
        type: Sequelize.FLOAT
      },
      TotalSold: {
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
    await queryInterface.dropTable('InvoiceItems');
  }
};