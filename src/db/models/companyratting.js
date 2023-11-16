'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class companyRatting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      companyRatting.belongsTo(models.company,{
        foreignKey: 'company_id',
        onDelete: 'CASCADE'
      })
    }
  }
  companyRatting.init({
    company_id: DataTypes.BIGINT,
    comment: DataTypes.STRING,
    ratting: DataTypes.NUMBER,
    client_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'companyRatting',
  });
  return companyRatting;
};