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
exports.SearchProducts = void 0;
const sequelize_1 = require("sequelize");
const db = require('../../db/models/index');
class SearchProducts {
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield db.produto.findAll({
                    where: {
                        nome: {
                            [sequelize_1.Op.like]: `%${req.params.name}%`,
                        },
                    },
                    limit: 100
                });
                return res.status(200).json(results);
            }
            catch (error) {
                res.status(401).json('Erro ao pesquisar produtos:' + error);
                throw error;
            }
        });
    }
}
exports.SearchProducts = SearchProducts;
