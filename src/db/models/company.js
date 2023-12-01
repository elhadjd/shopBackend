'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      company.belongsTo(models.activity_type,{
        foreignKey: 'activity_type_id'
      }),
      company.hasMany(models.produto,{
        foreignKey: 'company_id',
      })
      company.hasMany(models.companyRatting,{
        foreignKey: 'company_id'
      })
    }
  }
  company.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    nif: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    city: DataTypes.STRING,
    sede: DataTypes.STRING,
    house_number: DataTypes.STRING,
    shopOnline: DataTypes.BOOLEAN,
    country: DataTypes.STRING,
    manager: DataTypes.STRING,
    activity_type_id: DataTypes.NUMBER,
  }, {
    sequelize,
    modelName: 'company',
    defaultScope: {
      attributes: {
        exclude: ['createdAt','updatedAt']
      },
    },
    createdAt: false,
    updatedAt: false,
  });
  return company;
};