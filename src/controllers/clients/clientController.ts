import { Request, Response } from "express";
import { validationResult} from "express-validator"
const db = require("../../db/models");
import { invoiceController } from "../invoices";

export const ClientServices = (()=>{
    const {invoice} = invoiceController()
    const createClient = (async(req: Request,res: Response)=>{
        const result = validationResult(req)
        const invoiceId = req.params.invoiceId
        const order = await invoice(Number(invoiceId))
        if (!result.isEmpty()) {
            return res.json(result.array())
        }
        const [item,create] = await db.cliente.findOrCreate({
            where: [{email: req.body.email}],
            defaults: {
                company_id: 1,
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                token: req.body.token,
                image: req.body.image,
                user_id_clerk: req.body.user_id_clerk
            }
        })
        await order.update({
            cliente_id: item.id
        })

        return res.json(await getClient(item.id,Number(invoiceId)))
    })

    const getClient = (async(client_id: number,invoiceId: number)=>{
        const client = await db.cliente.findOne({where: {id: client_id},
            include: [
                {
                    model: db.invoice,
                    where: {id: invoiceId},
                    include: [{
                        model: db.invoice_item,
                        include:[{
                            model: db.produto
                        }]
                    }]
                },
                {
                    model: db.delivery,
                }
            ]
        })
        return client
    })

    return {createClient,getClient}
})