'use strict';
const {
  Model
} = require('sequelize');
const stocks = require('./stocks');
module.exports = (sequelize, DataTypes) => {
  class produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      produto.hasMany(models.stocks,{
        foreignKey: 'produtos_id',
        onDelete: 'CASCADE'
      })
    }
  }
  produto.init({
    nome: DataTypes.STRING,
    company_id: DataTypes.STRING,
    image: DataTypes.STRING,
    category_product_id: DataTypes.NUMBER,
    product_type_id: DataTypes.NUMBER,
    fabricante: DataTypes.STRING,
    preçocust: DataTypes.FLOAT,
    imposto: DataTypes.STRING,
    preçovenda: DataTypes.FLOAT,
    preco_medio: DataTypes.FLOAT,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'produto',
    defaultScope: {
      attributes: {
        exclude: ['createdAt','updatedAt']
      },
    },
    createdAt: false,
    updatedAt: false,
  });
  return produto;
};