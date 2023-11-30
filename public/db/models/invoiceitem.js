'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class invoice_item extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            invoice_item.belongsTo(models.produto, {
                foreignKey: 'produtos_id'
            });
            invoice_item.belongsTo(models.invoice, {
                foreignKey: 'invoice_id',
                onDelete: 'CASCADE'
            });
        }
    }
    invoice_item.init({
        invoice_id: DataTypes.NUMBER,
        produtos_id: DataTypes.NUMBER,
        armagen_id: DataTypes.NUMBER,
        quantity: DataTypes.NUMBER,
        PriceCost: DataTypes.FLOAT,
        PriceSold: DataTypes.FLOAT,
        Discount: DataTypes.FLOAT,
        tax: DataTypes.FLOAT,
        totalTax: DataTypes.FLOAT,
        TotalDiscount: DataTypes.FLOAT,
        final_price: DataTypes.FLOAT,
        TotalCost: DataTypes.FLOAT,
        TotalSold: DataTypes.FLOAT
    }, {
        sequelize,
        modelName: 'invoice_item',
        defaultScope: {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
        },
        createdAt: false,
        updatedAt: false,
    });
    return invoice_item;
};
