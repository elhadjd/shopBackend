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
exports.invoiceController = void 0;
const db = require("../../db/models");
exports.invoiceController = (() => {
    const getInvoices = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const Invoice = yield db.invoice.findOne({ where: { id: 323 }, defaultValue: { name: 'OLa Nada' } });
        return res.json({ response: Invoice }).status(200);
    }));
    const getInvoice = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const order = yield db.invoice.findOne({ where: { id: Number(id) }, include: [{
                    model: db.invoice_item,
                    include: [{
                            model: db.produto
                        }]
                }] });
        if (order)
            return res.status(200).json(order);
        return res.status(401).json({ message: 'fatura não encontrada', type: 'error' });
    }));
    const addProdAtOrder = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const checkout = req.params.checkout;
        const quantity = req.params.quantity;
        const product = req.body;
        const order = yield invoice(Number(id));
        return insertItem(product, order, res, Number(quantity), checkout);
    }));
    const insertItem = (product, order, res, quantity, checkout) => __awaiter(void 0, void 0, void 0, function* () {
        const stock = yield checkStock(product.id, 1);
        if (stock.quantity) {
            const [item, created] = yield db.invoice_item.findOrCreate({
                where: [{ produtos_id: product.id }, { invoice_id: order.id }],
                defaults: {
                    invoice_id: order.id,
                    produtos_id: product.id,
                    armagen_id: stock.armagen_id,
                    quantity: quantity,
                    PriceCost: product.preçocust,
                    PriceSold: product.preçovenda,
                    Discount: 0,
                    tax: 0,
                    totalTax: 0,
                    TotalDiscount: 0,
                    final_price: product.preçovenda,
                    TotalCost: product.preçocust,
                    TotalSold: product.preçovenda
                }
            });
            if (created) {
                return res.json(yield sumOrder(order.id));
            }
            else {
                return res.json(yield updateItem(product, item, quantity, checkout));
            }
        }
        return res.json(stock);
    });
    const updateItem = ((product, item, quantity, checkout) => __awaiter(void 0, void 0, void 0, function* () {
        const quant = checkout ? quantity : item.quantity + quantity;
        const check = yield checkStock(product.id, quant);
        if (check.quantity) {
            const itemUpdate = yield db.invoice_item.findOne({ where: { id: item.id } });
            const update = yield itemUpdate.update({
                TotalSold: quant * itemUpdate.PriceSold,
                TotalCost: quant * itemUpdate.PriceCost,
                quantity: quant,
            });
            yield update.save();
            return sumOrder(item.invoice_id);
        }
        return check;
    }));
    const checkStock = ((prodId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
        const stocks = yield db.stocks.findAll({ where: { produtos_id: prodId } });
        if (!stocks)
            return { state: false, message: 'Erro ao adicionar o produto no carrinho por favor contacte a empresa' };
        const check = stocks.find((stock) => stock.quantity >= quantity);
        if (!check)
            return { state: false, message: 'Este produto não tem quantidade em stock, por favor contacte a empresa' };
        return check;
    }));
    const invoice = ((id) => __awaiter(void 0, void 0, void 0, function* () {
        var date = new Date();
        const [item, created] = yield db.invoice.findOrCreate({
            where: { id: id ? id : 0 },
            defaults: {
                orderNumber: `FT${date.getDay()}-${date.getMonth() + 1}-${date.getFullYear()}`,
                company_id: 1,
                user_id: 1,
                cliente_id: 1,
                TotalInvoice: 0,
                discount: 0,
                TotalMerchandise: 0,
                tax: 0,
                state: 'Cotação',
                RestPayable: 0
            }
        });
        return yield db.invoice.findOne({ where: { id: Number(item.id) }, include: [{
                    model: db.invoice_item,
                    include: [{
                            model: db.produto
                        }]
                }] });
    }));
    const removeItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const idItem = req.params.idItem;
        const item = yield db.invoice_item.findOne({ where: { id: idItem } });
        yield item.destroy();
        return res.json(yield sumOrder(item.invoice_id));
    });
    const sumOrder = ((id) => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield invoice(id);
        var total = 0;
        order.invoice_items.forEach((item) => {
            total += item.TotalSold;
        });
        order.TotalMerchandise = total;
        order.TotalInvoice = total;
        const update = yield order.update(Object.assign(Object.assign({}, order), { where: { id: order.id } }));
        yield update.save();
        return order;
    }));
    return {
        getInvoices,
        getInvoice,
        addProdAtOrder,
        removeItem,
        invoice
    };
});
