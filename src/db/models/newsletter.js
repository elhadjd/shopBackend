'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class newsletter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      newsletter.belongsTo(models.cliente,{
        foreignKey: 'client_id',
        onDelete: 'CASCADE'
      })
    }
  }
  newsletter.init({
    email: DataTypes.STRING,
    client_id: DataTypes.INTEGER,
    state: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'newsletter',
  });
  return newsletter;
};