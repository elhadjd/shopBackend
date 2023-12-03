'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class currencyCompany extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  currencyCompany.init({
    code: DataTypes.STRING,
    currency: DataTypes.STRING,
    digits: DataTypes.STRING,
    number: DataTypes.NUMBER,
    company_id: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'currencyCompany',
  });
  return currencyCompany;
};