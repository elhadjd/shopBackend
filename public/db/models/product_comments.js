'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class product_comments extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    product_comments.init({
        client_id: DataTypes.BIGINT,
        product_id: DataTypes.BIGINT,
        comment: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'product_comments',
    });
    return product_comments;
};
