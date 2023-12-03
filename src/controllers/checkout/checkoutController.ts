import { Request, Response } from "express"
import { ClientServices } from "../clients/clientController"
import { TypeInvoice } from "../types"
const db = require('../../db/models')
export const checkoutController = (()=>{
    const {getClient} = ClientServices()
    const submitCheckout = (async(req: Request,res: Response)=>{
        const client = await db.cliente.findOne({where:{id: req.body.client.id}})
        const dataDelivery = {
            client_id: client.id,
            city: req.body.client.delivery.city,
            county: req.body.client.delivery.county,
            neighborhood: req.body.client.delivery.neighborhood,
            road: req.body.client.delivery.road,
            housNumber: req.body.client.delivery.housNumber,
            comment: req.body.client.delivery.comment,
            localisation: req.body.client.delivery.localisation,
            state: true
        }
        try {
            
            if (client) {
                const [delivery,createDelivery] = await db.delivery.findOrCreate({
                    where: [{client_id: client.id},{state: true}],
                    defaults: {...dataDelivery}
                })
                await client.update({phone: req.body.client.phone})
                const invoices = await db.invoice.findAll({where: {cliente_id: client.id,state: 'Cotação'}})
                
                invoices.forEach(async (invoice:TypeInvoice) => {
                    await db.invoice.update({delivery_id: delivery.id},{where:{id:invoice.id}})
                });
    
                if (!createDelivery) {
                   await db.delivery.update({...dataDelivery},{where:{id:delivery.id}})
                }

                return res.json(await getClient(client.id))
                
            }
            return res.json({message: 'Usuario nâo encontrado por favor faz login e tenta novamente OBRIGADO',type: 'error'}).status(200)
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Erro no servidor'+error})
        }
    })

    
    return {submitCheckout}
})