'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class category_products extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            category_products.hasMany(models.sub_category, {
                foreignKey: 'category_id',
                onDelete: 'CASCADE'
            });
            category_products.hasMany(models.produto, {
                foreignKey: 'category_product_id',
                onDelete: 'CASCADE'
            });
        }
    }
    category_products.init({
        name: DataTypes.STRING,
        image: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'category_products',
        defaultScope: {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
        },
        createdAt: false,
        updatedAt: false,
    });
    return category_products;
};
