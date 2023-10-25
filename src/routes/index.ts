import { Request, Response } from "express";
import { productController } from "../controllers/products";
import { invoiceController } from "../controllers/invoices";
import { checkoutController } from "../controllers/checkout/checkoutController";
import { ClientServices } from "../controllers/clients/clientController";
import { validationResult  ,query,body} from "express-validator"

const express = require('express');
const router = express.Router();

const {getProducts} = productController()
const {
    addProdAtOrder,
    getInvoice,
    removeItem
} = invoiceController()
const {submitCheckout} = checkoutController()
const {createClient,Login} = ClientServices()

router.get(`/products/:limit`,getProducts)
router.get('/invoice/:id',getInvoice)
router.post('/addProdAtOrder/:quantity/:id?/:checkout?',addProdAtOrder)
router.delete('/removeItem/:idItem',removeItem)
router.post('/checkoutSubmit',submitCheckout)
router.post('/registerUser',
body('email').isEmail(),
body('name').notEmpty(),
body('password').isLength({min: 6}),
body('password1').custom((value, { req }) => {
    return value === req.body.password;
}),createClient)
router.post('/login',body('email').notEmpty(),body('password').notEmpty(),Login)
export default router
