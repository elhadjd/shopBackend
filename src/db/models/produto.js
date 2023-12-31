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
      })
      produto.hasMany(models.productPromotions,{
        foreignKey: 'product_id',
      })
      produto.belongsTo(models.company,{
        foreignKey: 'company_id',
        onDelete: "CASCADE"
      })
      produto.belongsTo(models.category_products,{
        foreignKey: 'category_product_id',
        onDelete: 'CASCADE'
      })
      produto.hasMany(models.product_picture,{
        foreignKey: 'product_id',
      })
      produto.belongsTo(models.sub_category,{
        foreignKey: 'sub_category_id'
      })
      produto.belongsTo(models.company,{
        foreignKey: 'company_id'
      })
      produto.hasMany(models.product_likes,{
        foreignKey: 'product_id'
      })
      produto.hasMany(models.product_comments,{
        foreignKey: 'product_id'
      })
    }
  }

  produto.init({
    nome: DataTypes.STRING,
    company_id: DataTypes.STRING,
    image: DataTypes.STRING,
    category_product_id: DataTypes.NUMBER,
    sub_category_id: DataTypes.BIGINT,
    product_type_id: DataTypes.NUMBER,
    fabricante: DataTypes.STRING,
    preçocust: DataTypes.FLOAT,
    imposto: DataTypes.STRING,
    preçovenda: DataTypes.FLOAT,
    preco_medio: DataTypes.FLOAT,
    shop_online: DataTypes.BOOLEAN,
    estado: DataTypes.STRING,
    description: DataTypes.TEXT
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