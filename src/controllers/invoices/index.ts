import { Request, Response } from "express"
import { ItemInvoice, Product, TypeInvoice } from "../types"
const db = require("../../db/models")

export const invoiceController = (()=>{
    const getInvoices = (async(req:Request,res:Response)=>{
        const Invoice = await db.invoice.findOne({where:{id: 323},defaultValue:{name:'OLa Nada'}})
        return res.json({response: Invoice}).status(200)
    })

    const getInvoice = (async(req:Request,res:Response)=>{
        const id = req.params.id
        const order = await db.invoice.findOne({where:{id:Number(id)},include: [{
            model: db.invoice_item,
            include:[{
                model: db.produto
            }]
        }]})
        
        if (order) return res.status(200).json(order)
        return res.status(401).json({message: 'fatura não encontrada',type:'error'})
    })

    const addProdAtOrder = (async(req: Request,res: Response)=>{
        const id = req.params.id
        const product:Product = req.body
        const order = await invoice(Number(id))
        return insertItem(product,order,res)
    })
    
    const insertItem = async(product:Product,order: TypeInvoice,res:Response)=>{
        const stock = await checkStock(product.id,1)
        if (stock.quantity) {
            const [item, created] = await db.invoice_item.findOrCreate({
                where: [{produtos_id: product.id},{invoice_id: order.id}],
                defaults: {
                    invoice_id: order.id,
                    produtos_id: product.id,
                    armagen_id: stock.armagen_id,
                    quantity: 1,
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
                return res.json(await sumOrder(order.id))
            }else{
                return res.json(await updateItem(product,item))
            }
        }
        return res.json(stock)
    }

    const updateItem = (async (product: Product,item: ItemInvoice)=>{
        const quantity = item.quantity + 1
        const check = await checkStock(product.id,quantity)
        if (check.quantity) {
            const itemUpdate = await db.invoice_item.findOne({where: {id: item.id}})
            const update = await itemUpdate.update({
                TotalSold: quantity * itemUpdate.PriceSold,
                TotalCost: quantity * itemUpdate.PriceCost,
                quantity: quantity,
            })
            await update.save()
            return sumOrder(item.invoice_id)
        }
        return check
    })

    const checkStock = (async(prodId: number,quantity: number)=>{
        const stocks = await db.stocks.findAll({where:{produtos_id: prodId}})
        if (!stocks) return {state:false,message:'Erro ao adicionar o produto no carrinho por favor contacte a empresa'}
        const check = stocks.find((stock:any) =>stock.quantity >= quantity)
        if(!check) return {state:false,message:'Este produto não tem quantidade em stock, por favor contacte a empresa'}
        return check
    })

    const invoice = (async(id?:number)=>{
        var date = new Date()
        const [item, created] = await db.invoice.findOrCreate({
            where: { id: id? id:0},
            defaults: {
                orderNumber: `FT${date.getDay()}-${date.getMonth()+1}-${date.getFullYear()}`,
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
        })
        return await db.invoice.findOne({where:{id:Number(item.id)},include: [{
            model: db.invoice_item,
            include:[{
                model: db.produto
            }]
        }]})
    })

    const removeItem = async(req:Request,res:Response)=>{
        const idItem = req.params.idItem
        const item = await db.invoice_item.findOne({where:{id: idItem}})
        await item.destroy()
        return res.json(await sumOrder(item.invoice_id))
    }
    const sumOrder = (async(id:number)=>{
        const order = await invoice(id)
        var total:number = 0
        order.invoice_items.forEach((item: ItemInvoice) => {
            total += item.TotalSold
        });
        order.TotalMerchandise = total
        order.TotalInvoice = total
        const update = await order.update({...order,where:{id: order.id}})
        await update.save()
        return order
    })


    return {
        getInvoices,
        getInvoice,
        addProdAtOrder,
        removeItem
    }
})