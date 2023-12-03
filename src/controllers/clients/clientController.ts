import { Request, Response } from "express";
import { validationResult} from "express-validator"
import { useConvertMoneyController } from "./convertManey";
import { ClientTypeScript, ItemInvoice, TypeInvoice } from "../types";
const db = require("../../db/models");
export const ClientServices = (()=>{
    const {converter} = useConvertMoneyController()
    const createClient = (async(req: Request,res: Response)=>{
        const result = validationResult(req)
        
        if (!result.isEmpty()) {
            return res.json(result.array())
        }

        try {
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
            res.json(await getClient(item.id))
        } catch (error) {
            res.status(500).json({message: 'Erro no servidor '+error})
        }
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
                                    model: db.company,
                                    include: [{
                                        model:db.currencyCompany
                                    }]
                                }]
                            }]
                        }]
                    },
                    {
                        model: db.delivery,
                    },
                    {
                        model: db.currencyClient,
                    }
                ]
            })
            return client
        } catch (error) {
            console.log('Erro no servidor '+error);
        }

    })

    const changeCurrency = async(req:Request,res:Response)=>{
        const {currency} = req.body
        const client_id = Number(req.params.client_id)
        try {
            const client:ClientTypeScript = await getClient(client_id)
            client.currencyClient = currency
            await converter(client).then(async(result)=>{
                const [existCurrency,createCurrency] = await db.currencyClient.findOrCreate({
                    where: [{cliente_id: client_id}],
                    defaults: {
                        currency: currency.currency,
                        code: currency.code,
                        digits: currency.digits,
                        cliente_id: client_id,
                        number: currency.number
                    }
                })
                if (!createCurrency) {
                    await db.currencyClient.update(
                    {
                        currency: currency.currency,
                        code: currency.code,
                        digits: currency.digits,
                        number: currency.number,
                    },{where:{id: existCurrency.id}})
                }

                const currencyClient = await db.currencyClient.findOne({where:{id: existCurrency.id}})

                return res.json({result,currencyClient: currencyClient}).status(200)
                
            }).catch((err)=>{
                console.log(err);
                return res.json({message: 'Não foi possivel converter a fatura na moeda selecionada'+ err}).status(500)
            })
        } catch (error) {
            res.status(500).json({message: 'Não foi possivel converter a fatura na moeda selecionada'+error})
        }
    }

    return {createClient,getClient,changeCurrency}
})