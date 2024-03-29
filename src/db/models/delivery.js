'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class delivery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      delivery.belongsTo(models.cliente,{
        foreignKey: 'client_id',
        onDelete: 'CASCADE',
      })
    }
  }
  delivery.init({
    city: DataTypes.STRING,
    client_id: DataTypes.BIGINT,
    phone: DataTypes.STRING,
    country: DataTypes.STRING,
    county: DataTypes.STRING,
    neighborhood: DataTypes.STRING,
    road: DataTypes.STRING,
    housNumber: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    localisation: DataTypes.TEXT,
    state: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'delivery',
    defaultScope: {
      attributes: {
        exclude: ['createdAt','updatedAt']
      },
    },
    createdAt: false,
    updatedAt: false,
  });
  return delivery;
};