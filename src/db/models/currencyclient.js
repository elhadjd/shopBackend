'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class currencyClient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  currencyClient.init({
    code: DataTypes.STRING,
    currency: DataTypes.STRING,
    digits: DataTypes.STRING,
    number: DataTypes.INTEGER,
    cliente_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'currencyClient',
  });
  return currencyClient;
};