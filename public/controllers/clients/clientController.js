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
exports.ClientServices = void 0;
const express_validator_1 = require("express-validator");
const db = require("../../db/models");
const invoices_1 = require("../invoices");
exports.ClientServices = (() => {
    const { invoice } = (0, invoices_1.invoiceController)();
    const createClient = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = (0, express_validator_1.validationResult)(req);
        const invoiceId = req.params.invoiceId;
        const order = yield invoice(Number(invoiceId));
        if (!result.isEmpty()) {
            return res.json(result.array());
        }
        const [item, create] = yield db.cliente.findOrCreate({
            where: [{ email: req.body.email }],
            defaults: {
                company_id: 1,
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                token: req.body.token,
                image: req.body.image,
                user_id_clerk: req.body.user_id_clerk
            }
        });
        yield order.update({
            cliente_id: item.id
        });
        return res.json(yield getClient(item.id, Number(invoiceId)));
    }));
    const getClient = ((client_id, invoiceId) => __awaiter(void 0, void 0, void 0, function* () {
        const client = yield db.cliente.findOne({ where: { id: client_id },
            include: [
                {
                    model: db.invoice,
                    where: { id: invoiceId },
                    include: [{
                            model: db.invoice_item,
                            include: [{
                                    model: db.produto
                                }]
                        }]
                },
                {
                    model: db.delivery,
                }
            ]
        });
        return client;
    }));
    return { createClient, getClient };
});
