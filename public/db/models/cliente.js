'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class cliente extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            cliente.hasMany(models.invoice, {
                foreignKey: 'cliente_id',
                onDelete: 'CASCADE',
            });
            cliente.hasOne(models.delivery, {
                foreignKey: 'client_id',
                onDelete: 'CASCADE',
            });
        }
    }
    cliente.init({
        company_id: DataTypes.NUMBER,
        image: DataTypes.STRING,
        surname: DataTypes.STRING,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        whatssap: DataTypes.STRING,
        phone: DataTypes.STRING,
        city: DataTypes.STRING,
        country: DataTypes.STRING,
        rua: DataTypes.STRING,
        state: DataTypes.STRING,
        token: DataTypes.STRING,
        user_id_clerk: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'cliente',
        defaultScope: {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
        },
        createdAt: false,
        updatedAt: false,
    });
    return cliente;
};
