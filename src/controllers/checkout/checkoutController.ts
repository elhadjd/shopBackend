import { Request, Response } from "express"
import { ClientServices } from "../clients/clientController"
const db = require('../../db/models')
export const checkoutController = (()=>{
    const {getClient} = ClientServices()
    const submitCheckout = (async(req: Request,res: Response)=>{
        const client = await db.cliente.findOne({where:{id: req.body.client.id}})
        if (client) {
            const [item,create] = await db.delivery.findOrCreate({
                where: [{client_id: client.id},{state: true}],
                defaults: {
                    client_id: client.id,
                    city: req.body.client.delivery.city,
                    county: req.body.client.delivery.county,
                    neighborhood: req.body.client.delivery.neighborhood,
                    road: req.body.client.delivery.road,
                    housNumber: req.body.client.delivery.housNumber,
                    comment: req.body.client.delivery.comment,
                    state: true
                }
            })
            await client.update({phone: req.body.client.phone})
            if (!create) {
                await item.update({...req.body.client.delivery,where: {id: item.id}})
            }
            return res.json(await getClient(client.id))
            
        }
        return res.json({message: 'Usuario nâo encontrado por favor faz login e tenta novamente OBRIGADO',type: 'error'}).status(200)
        
    })

    
    return {submitCheckout}
})