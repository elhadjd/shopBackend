import { productsController } from "../controllers/products";
import { invoiceController } from "../controllers/invoices";
import { checkoutController } from "../controllers/checkout/checkoutController";
import { ClientServices } from "../controllers/clients/clientController";
import { body,checkExact,param } from "express-validator"
import { productController } from "../controllers/products/product";
import { categoriesController } from "../controllers/products/categories/categoryController";
import { Request,Response } from "express";
import { companies } from '../controllers/companies/companiesController'
import { company } from "../controllers/companies/companyController";
import { SearchProducts } from "../controllers/products/searchProducts";
import {NewsletterController} from '../controllers/newsletter/newsletterController'
const {getCategories} = categoriesController()
const express = require('express');
const router = express.Router();
const {getProduct,likeAnComment} = productController()
const {getProducts} = productsController()
const companiesController = new companies()
const companyController = new company()
const SearchProductsController = new SearchProducts()
const {register} = NewsletterController()
const {
    addProdAtOrder,
    getInvoice,
    removeItem
} = invoiceController()
const {submitCheckout,RegisterPayment} = checkoutController()
const {createClient,changeCurrency,getClients,saveClientAddress,deleteAddress} = ClientServices()
router.get('/',(req: Request,res: Response)=>{
    res.json('Este e o meu servidor').status(200)
})

router.get(`/products/:limit`,getProducts)
router.get('/invoice/:id',getInvoice)
router.post('/addProdAtOrder/:quantity/:client_id?/:checkout?',addProdAtOrder)
router.delete('/removeItem/:idItem',removeItem)
router.post('/checkoutSubmit',body('client'),submitCheckout)
router.post('/registerUser',
body('email').isEmail(),
body('name').notEmpty(),body('token'),createClient)
router.get('/product/:productId',getProduct)
router.get('/categories/:id?',getCategories)
router.get('/companies',companiesController.getCompanies)
router.route('/company/:id',param('id')).get(companyController.getCompany)
router.post('/registerRatting',companyController.registerRatting)
router.post('/sendMessageCompany',companyController.sendMessage)
router.get('/searchProducts/:name',SearchProductsController.search)
router.post('/changeCurrency/:client_id',changeCurrency)
router.post('/registerNewsletter',register)
router.post('/likeAnComment',likeAnComment)
router.get('/getClient/:client_id',()=>getClients)
router.post('/saveClientAddress',saveClientAddress)
router.delete('/deleteAddress/:address_id/:client_id',deleteAddress)
router.post('/RegisterPayment/:order',RegisterPayment)
export default router
