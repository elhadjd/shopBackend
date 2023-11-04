import { productsController } from "../controllers/products";
import { invoiceController } from "../controllers/invoices";
import { checkoutController } from "../controllers/checkout/checkoutController";
import { ClientServices } from "../controllers/clients/clientController";
import { body} from "express-validator"
import { productController } from "../controllers/products/product";
import { categoriesController } from "../controllers/products/categories/categoryController";
import { Request,Response } from "express";
const {getCategories} = categoriesController()
const express = require('express');
const router = express.Router();
const {getProduct} = productController()
const {getProducts} = productsController()
const {
    addProdAtOrder,
    getInvoice,
    removeItem
} = invoiceController()
const {submitCheckout} = checkoutController()
const {createClient} = ClientServices()
router.get('/',(req: Request,res: Response)=>{
    res.json('Este e o meu servidor').status(200)
})
router.get(`/products/:limit`,getProducts)
router.get('/invoice/:id',getInvoice)
router.post('/addProdAtOrder/:quantity/:id?/:checkout?',addProdAtOrder)
router.delete('/removeItem/:idItem',removeItem)
router.post('/checkoutSubmit',body('client'),submitCheckout)
router.post('/registerUser/:invoiceId',
body('email').isEmail(),
body('name').notEmpty(),body('token'),createClient)
router.get('/product/:productId',getProduct)
router.get('/categories/:id?',getCategories)
export default router
