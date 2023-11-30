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
exports.checkoutController = void 0;
const clientController_1 = require("../clients/clientController");
const db = require('../../db/models');
exports.checkoutController = (() => {
    const { getClient } = (0, clientController_1.ClientServices)();
    const submitCheckout = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const client = yield db.cliente.findOne({ where: { id: req.body.client.id } });
        if (client) {
            const [item, create] = yield db.delivery.findOrCreate({
                where: [{ client_id: client.id }, { state: 1 }],
                defaults: {
                    client_id: client.id,
                    city: req.body.client.delivery.city,
                    county: req.body.client.delivery.county,
                    neighborhood: req.body.client.delivery.neighborhood,
                    road: req.body.client.delivery.road,
                    housNumber: req.body.client.delivery.housNumber,
                    comment: req.body.client.delivery.comment,
                    state: true
                }
            });
            yield client.update({ phone: req.body.client.phone });
            if (!create) {
                yield item.update(Object.assign(Object.assign({}, req.body.client.delivery), { where: { id: item.id } }));
            }
            return res.json(yield getClient(client.id, req.body.client.invoices[0].id));
        }
        return res.json({ message: 'Usuario nâo encontrado por favor faz login e tenta novamente OBRIGADO', type: 'error' }).status(200);
    }));
    return { submitCheckout };
});
