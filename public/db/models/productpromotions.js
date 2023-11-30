'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class productPromotions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            productPromotions.belongsTo(models.produto, {
                foreignKey: 'product_id',
                onDelete: 'CASCADE'
            });
        }
    }
    productPromotions.init({
        product_id: DataTypes.BIGINT,
        name: DataTypes.STRING,
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'productPromotions',
    });
    return productPromotions;
};
