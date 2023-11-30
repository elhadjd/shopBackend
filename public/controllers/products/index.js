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
exports.productsController = void 0;
const db = require('../../db/models/index');
exports.productsController = (() => {
    const getProducts = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const limit = Number(req.params.limit);
        const products = yield db.produto.findAll({ where: { company_id: 1 },
            include: [{
                    model: db.stocks,
                }]
        });
        return res.json({ response: products }).status(200);
    }));
    return { getProducts };
});
