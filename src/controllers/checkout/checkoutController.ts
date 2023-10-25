import { Request, Response } from "express"
const db = require('../../db/models')
export const checkoutController = (()=>{
    const submitCheckout = (async(req: Request,res: Response)=>{
        const client = await db.cliente.findOne({where:{id: req.body.client.id}})
        return res.json(client)
    })
    return {submitCheckout}
})