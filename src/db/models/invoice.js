'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      invoice.hasMany(models.invoice_item,{
        foreignKey: 'invoice_id',
        onDelete: 'CASCADE',
      })
      invoice.belongsTo(models.cliente,{
        foreignKey: 'cliente_id',
        onDelete: 'CASCADE'
      })
    }
  }
  invoice.init({
    orderNumber: DataTypes.STRING,
    company_id: DataTypes.STRING,
    user_id: DataTypes.NUMBER,
    cliente_id: DataTypes.NUMBER,
    TotalInvoice: DataTypes.FLOAT,
    delivery_id: DataTypes.BIGINT,
    discount: DataTypes.FLOAT,
    TotalMerchandise: DataTypes.FLOAT,
    tax: DataTypes.FLOAT,
    state: DataTypes.STRING,
    DateOrder: DataTypes.DATE,
    DateDue: DataTypes.DATE,
    RestPayable: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'invoice',
    defaultScope: {
      attributes: {
        exclude: ['createdAt','updatedAt']
      },
    },
    createdAt: false,
    updatedAt: false,
  });
  return invoice;
};
