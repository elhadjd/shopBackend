"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../controllers/products");
const invoices_1 = require("../controllers/invoices");
const checkoutController_1 = require("../controllers/checkout/checkoutController");
const clientController_1 = require("../controllers/clients/clientController");
const express_validator_1 = require("express-validator");
const product_1 = require("../controllers/products/product");
const categoryController_1 = require("../controllers/products/categories/categoryController");
const companiesController_1 = require("../controllers/companies/companiesController");
const companyController_1 = require("../controllers/companies/companyController");
const searchProducts_1 = require("../controllers/products/searchProducts");
const { getCategories } = (0, categoryController_1.categoriesController)();
const express = require('express');
const router = express.Router();
const { getProduct } = (0, product_1.productController)();
const { getProducts } = (0, products_1.productsController)();
const companiesController = new companiesController_1.companies();
const companyController = new companyController_1.company();
const SearchProductsController = new searchProducts_1.SearchProducts();
const { addProdAtOrder, getInvoice, removeItem } = (0, invoices_1.invoiceController)();
const { submitCheckout } = (0, checkoutController_1.checkoutController)();
const { createClient } = (0, clientController_1.ClientServices)();
router.get('/', (req, res) => {
    res.json('Este e o meu servidor').status(200);
});
router.get(`/products/:limit`, getProducts);
router.get('/invoice/:id', getInvoice);
router.post('/addProdAtOrder/:quantity/:id?/:checkout?', addProdAtOrder);
router.delete('/removeItem/:idItem', removeItem);
router.post('/checkoutSubmit', (0, express_validator_1.body)('client'), submitCheckout);
router.post('/registerUser/:invoiceId', (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('name').notEmpty(), (0, express_validator_1.body)('token'), createClient);
router.get('/product/:productId', getProduct);
router.get('/categories/:id?', getCategories);
router.get('/companies', companiesController.getCompanies);
router.route('/company/:id', (0, express_validator_1.param)('id'))
    .get(companyController.getCompany);
router.post('/registerRatting', companyController.registerRatting);
router.post('/sendMessageCompany', companyController.sendMessage);
router.get('/searchProducts/:name', SearchProductsController.search);
exports.default = router;