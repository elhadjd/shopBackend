'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('produtos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      company_id: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      category_product_id: {
        type: Sequelize.NUMBER
      },
      product_type_id: {
        type: Sequelize.NUMBER
      },
      fabricante: {
        type: Sequelize.STRING
      },
      preçocust: {
        type: Sequelize.FLOAT
      },
      imposto: {
        type: Sequelize.STRING
      },
      preçovenda: {
        type: Sequelize.FLOAT
      },
      preco_medio: {
        type: Sequelize.FLOAT
      },
      estado: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('produtos');
  }
};