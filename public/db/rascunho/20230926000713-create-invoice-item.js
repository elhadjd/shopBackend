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
            yield queryInterface.createTable('InvoiceItems', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                invoice_id: {
                    type: Sequelize.NUMBER
                },
                produtos_id: {
                    type: Sequelize.NUMBER
                },
                armagen_id: {
                    type: Sequelize.NUMBER
                },
                quantity: {
                    type: Sequelize.NUMBER
                },
                PriceCost: {
                    type: Sequelize.FLOAT
                },
                PriceSold: {
                    type: Sequelize.FLOAT
                },
                Discount: {
                    type: Sequelize.FLOAT
                },
                tax: {
                    type: Sequelize.FLOAT
                },
                totalTax: {
                    type: Sequelize.FLOAT
                },
                TotalDiscount: {
                    type: Sequelize.FLOAT
                },
                final_price: {
                    type: Sequelize.FLOAT
                },
                TotalCost: {
                    type: Sequelize.FLOAT
                },
                TotalSold: {
                    type: Sequelize.FLOAT
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
            yield queryInterface.dropTable('InvoiceItems');
        });
    }
};
