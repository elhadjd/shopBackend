'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_picture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      product_picture.belongsTo(models.produto,{
        foreignKey: 'product_id',
        onDelete: 'CASCADE'
      })
    }
  }
  product_picture.init({
    image: DataTypes.STRING,
    product_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'product_picture',
  });
  return product_picture;
};