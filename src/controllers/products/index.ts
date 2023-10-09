import { Request, Response } from "express"
const db = require('../../db/models/index')

export const productController = (()=>{

    const getProducts = (async(req:Request,res:Response)=>{
        const limit = Number(req.params.limit)
        const products = await db.produto.findAll({where:{company_id: 13},offset: limit,limit:limit,
            include:[{
                model: db.stocks,
            }]
        })
        return res.json({response: products}).status(200)
    })
    return {getProducts}
})