'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sub_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      sub_category.belongsTo(models.category_products,{
        foreignKey: 'category_id',
        onDelete: 'CASCADE'
      })
    }
  }
  sub_category.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    category_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'sub_category',
  });
  return sub_category;
};