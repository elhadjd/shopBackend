"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesController = void 0;
const db = require('../../../db/models');
function categoriesController() {
    const getCategories = ((req, res) => __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        if (id) {
            const category = yield db.category_products.findOne({
                where: { id: Number(id) },
                include: [
                    {
                        model: db.sub_category,
                        required: false,
                        include: [
                            {
                                model: db.produto
                            }
                        ]
                    },
                    {
                        model: db.produto,
                        where: { estado: 'active' },
                        required: false
                    }
                ]
            });
            return res.status(200).json(category);
        }
        const categories = yield db.category_products.findAll({
            include: [{
                    model: db.sub_category
                }]
        });
        res.json(categories);
    }));
    return { getCategories };
}
exports.categoriesController = categoriesController;
