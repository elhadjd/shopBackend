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
      sub_category.hasMany(models.produto,{
        foreignKey: 'sub_category_id'
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
    defaultScope: {
      attributes: {
        exclude: ['createdAt','updatedAt']
      },
    },
    createdAt: false,
    updatedAt: false,
  });
  return sub_category;
};