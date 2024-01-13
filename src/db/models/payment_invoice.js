'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment_invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  payment_invoice.init({
    payment_method_id: DataTypes.INTEGER,
    invoice_id: DataTypes.INTEGER,
    Amount: DataTypes.INTEGER,
    TotalPayments: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'payment_invoice',
    defaultScope: {
      attributes: {
        exclude: ['createdAt','updatedAt']
      },
    },
    createdAt: false,
    updatedAt: false,
  });
  return payment_invoice;
};