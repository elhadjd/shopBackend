'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class delivery extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            delivery.belongsTo(models.cliente, {
                foreignKey: 'client_id',
                onDelete: 'CASCADE',
            });
        }
    }
    delivery.init({
        city: DataTypes.STRING,
        client_id: DataTypes.BIGINT,
        county: DataTypes.STRING,
        neighborhood: DataTypes.STRING,
        road: DataTypes.STRING,
        housNumber: DataTypes.INTEGER,
        comment: DataTypes.STRING,
        state: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'delivery',
    });
    return delivery;
};
