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
exports.company = void 0;
const contactController_1 = require("./contact/contactController");
const db = require('../../db/models/index');
class company {
    constructor() {
        this.returnCompany;
    }
    getCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const companyInstance = new company();
            const companyGet = yield companyInstance.returnCompany(Number(req.params.id));
            return res.status(200).json(companyGet);
        });
    }
    returnCompany(company_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const companies = yield db.company.findOne({
                    where: { id: company_id },
                    include: [
                        {
                            model: db.activity_type
                        },
                        {
                            model: db.produto,
                            limit: 30,
                            include: [{
                                    model: db.stocks,
                                }]
                        },
                        {
                            model: db.companyRatting,
                            order: [
                                ['createdAt', 'ASC']
                            ]
                        }
                    ]
                });
                return companies || null; // Retorna null se a empresa não for encontrada
            }
            catch (error) {
                console.error("Erro ao obter empresa:", error);
                return "Erro ao obter empresa:" + error;
            }
        });
    }
    registerRatting(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db.companyRatting.create({
                company_id: req.body.company_id,
                client_id: req.body.client_id,
                comment: req.body.comment,
                ratting: req.body.ratting,
            });
            const companyInstance = new company();
            const companyGet = yield companyInstance.returnCompany(req.body.company_id);
            return res.status(200).json(companyGet);
        });
    }
    sendMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newMessage } = (0, contactController_1.contactController)();
            const instanciaCompany = new company();
            const companyTo = yield instanciaCompany.returnCompany(req.body.company_id);
            if (companyTo.id) {
                newMessage(req.body, companyTo.email)
                    .then((message) => {
                    return res.json(message).status(200);
                }).catch((error) => {
                    return res.status(401).json(error);
                });
            }
        });
    }
}
exports.company = company;
