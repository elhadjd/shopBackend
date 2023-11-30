import { Request, Response } from "express";
import { validationResult} from "express-validator"
const db = require("../../db/models");

export const ClientServices = (()=>{
    const createClient = (async(req: Request,res: Response)=>{
        const result = validationResult(req)
        
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

        return res.json(await getClient(item.id))
    })

    const getClient = (async(client_id: number)=>{
        try {
            const client = await db.cliente.findOne({where: {id: client_id},
                include: [
                    {
                        model: db.invoice,
                        where: {state: 'Cotação'},
                        include: [{
                            model: db.invoice_item,
                            include:[{
                                model: db.produto,
                                include: [{
                                    model:db.company
                                }]
                            }]
                        }]
                    },
                    {
                        model: db.delivery,
                    }
                ]
            })
            return client
        } catch (error) {
            console.log('Erro no servidor'+error);
            
        }

    })

    return {createClient,getClient}
})