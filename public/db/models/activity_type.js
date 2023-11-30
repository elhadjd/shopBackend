'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class activity_type extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    activity_type.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'activity_type',
        defaultScope: {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
        },
        createdAt: false,
        updatedAt: false,
    });
    return activity_type;
};
