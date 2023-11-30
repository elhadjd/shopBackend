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
exports.productController = void 0;
const db = require('../../db/models');
exports.productController = (() => {
    const getProduct = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const productId = req.params.productId;
        const query = yield db.produto.findOne({ where: { id: productId },
            include: [
                {
                    model: db.stocks,
                },
                {
                    model: db.company
                },
                {
                    model: db.product_picture
                },
                {
                    model: db.productPromotions
                },
                {
                    model: db.category_products,
                    include: [
                        {
                            model: db.produto
                        },
                        {
                            model: db.sub_category
                        }
                    ]
                }
            ],
        });
        return res.status(200).json(query);
    }));
    return { getProduct };
});
