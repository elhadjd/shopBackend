'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ratings extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ratings.init({
        company_id: DataTypes.BIGINT,
        client_id: DataTypes.BIGINT,
        invoice_id: DataTypes.BIGINT,
        comment: DataTypes.TEXT,
        stars: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'ratings',
    });
    return ratings;
};
