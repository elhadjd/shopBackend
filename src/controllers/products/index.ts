import { Request, Response } from "express"
const db = require('../../db/models/index')

export const productsController = (()=>{

    const getProducts = (async(req:Request,res:Response)=>{
        const limit = Number(req.params.limit)
        const products = await db.produto.findAll({where:{shop_online: true},
            include:[{
                model: db.stocks,
            },{
                model: db.company,
                include: [{
                    model:db.currencyCompany
                }]
            }]
        })
        
        return res.json({response: products}).status(200)
    })
    return {getProducts}
})