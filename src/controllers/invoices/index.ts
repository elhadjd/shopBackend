import { Request, Response } from "express"
import { ItemInvoice, Product, TypeInvoice } from "../types"
import { ClientServices } from "../clients/clientController"
const db = require("../../db/models")

export const invoiceController = (()=>{
    const getInvoices = (async(req:Request,res:Response)=>{
        const Invoice = await db.invoice.findOne({where:{id: 323},defaultValue:{name:'OLa Nada'}})
        return res.json({response: Invoice}).status(200)
    })

    const {getClient} = ClientServices()

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
        const client_id = req.params.client_id
        const checkout = req.params.checkout
        const quantity = req.params.quantity
        const product:Product = req.body
        const order = await invoice(Number(client_id),product.company_id)
        return insertItem(product,order,res,Number(quantity),checkout)
    })
    

    const insertItem = async(product:Product,order: TypeInvoice,res:Response,quantity:number,checkout?: string)=>{
        const stock = await checkStock(product.id,1)
        if (stock.quantity) {
            const [item, created] = await db.invoice_item.findOrCreate({
                where: [{produtos_id: product.id},{invoice_id: order.id}],
                defaults: {
                    invoice_id: order.id,
                    produtos_id: product.id,
                    armagen_id: stock.armagen_id,
                    quantity: quantity,
                    PriceCost: product.preçocust,
                    PriceSold: product.preçovenda + product.preçovenda/100*5,
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
                return res.json(await updateItem(product,item,quantity,checkout))
            }
        }
        return res.json(stock)
    }


    const updateItem = (async (product: Product,item: ItemInvoice,quantity:number,checkout?:string)=>{
        const quant = checkout ? quantity : item.quantity + quantity
        const check = await checkStock(product.id,quant)
        if (check.quantity) {
            const itemUpdate = await db.invoice_item.findOne({where: {id: item.id}})
             await db.invoice_item.update({
                TotalSold: quant * itemUpdate.PriceSold,
                TotalCost: quant * itemUpdate.PriceCost,
                quantity: quant,
            },{where: {id: item.id}})
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

    const invoice = (async(client_id: number,company_id:number)=>{
        var date = new Date()
        const [item, created] = await db.invoice.findOrCreate({
            where: { cliente_id: client_id,company_id: company_id,state: 'Cotação'},
            defaults: {
                orderNumber: `FT${date.getDay()}-${date.getMonth()+1}-${date.getFullYear()}`,
                company_id: company_id,
                user_id: 1,
                cliente_id: client_id,
                TotalInvoice: 0,
                discount: 0,
                TotalMerchandise: 0,
                tax: 0,
                state: 'Cotação',
                RestPayable: 0
            }
        })
        return await db.invoice.findOne({where:{id:item.id},include: [{
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

    
    const sumOrder = (async(invoice_id: number)=>{
        try {
            const order:TypeInvoice =  await db.invoice.findOne({where:{id:invoice_id},include: [{
                model: db.invoice_item,
            }]})
            var total:number = 0
            order.invoice_items.forEach((item: ItemInvoice) => {
                total += item.TotalSold
            });
            
            await db.invoice.update({TotalMerchandise: total,TotalInvoice:total},{where:{id: order.id}})
            
            return await getClient(order.cliente_id)
        } catch (error) {
            console.log('Erro no servidor'+error);
        }
    })


    return {
        getInvoices,
        getInvoice,
        addProdAtOrder,
        removeItem,
        invoice
    }
})