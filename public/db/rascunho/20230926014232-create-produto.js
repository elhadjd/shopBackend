'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.createTable('produtos', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                nome: {
                    type: Sequelize.STRING
                },
                company_id: {
                    type: Sequelize.STRING
                },
                image: {
                    type: Sequelize.STRING
                },
                category_product_id: {
                    type: Sequelize.NUMBER
                },
                product_type_id: {
                    type: Sequelize.NUMBER
                },
                fabricante: {
                    type: Sequelize.STRING
                },
                preçocust: {
                    type: Sequelize.FLOAT
                },
                imposto: {
                    type: Sequelize.STRING
                },
                preçovenda: {
                    type: Sequelize.FLOAT
                },
                preco_medio: {
                    type: Sequelize.FLOAT
                },
                estado: {
                    type: Sequelize.STRING
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                }
            });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable('produtos');
        });
    }
};
