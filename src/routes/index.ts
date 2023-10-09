import { Request, Response } from "express";
import { productController } from "../controllers/products";
import { invoiceController } from "../controllers/invoices";

const express = require('express');
const router = express.Router();

const {getProducts} = productController()
const {
    addProdAtOrder,
    getInvoice,
    removeItem
} = invoiceController()

router.get(`/products/:limit`,getProducts)
router.get('/invoice/:id',getInvoice)
router.post('/addProdAtOrder/:id?',addProdAtOrder)
router.delete('/removeItem/:idItem',removeItem)
export default router
