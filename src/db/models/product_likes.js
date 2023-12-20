'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_likes extends Model {
    
    static associate(models) {
      product_likes.belongsTo(models.produto,{
        foreignKey: 'product_id',
        onDelete: "CASCADE"
      })
    }
  }
  product_likes.init({
    client_id: DataTypes.BIGINT,
    product_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'product_likes',
  });
  return product_likes;
};