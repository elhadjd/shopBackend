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
            const client = await db.cliente.findOne({where: {email: req.body.email}});
            if (!client) {
                const client = await db.cliente.create({
                    company_id: 1,
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    token: req.body.token,
                    image: req.body.image,
                    user_id_clerk: req.body.user_id_clerk
                })
            }
            res.json(await getClient(client.id))
        } catch (error) {
            res.status(500).json({message: 'Erro no servidor '+error})
        }
    })

    const getClients = (async(req: Request,res:Response)=>{
        const client_id = req.params.client_id
        try {
            const client = await db.cliente.findOne({
                where: {id: client_id},
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
                        }],
                        required: false
                    },
                    {
                        model: db.delivery,
                    },
                    {
                        model: db.currencyClient,
                    }
                ]
            })
            return res.json(client)
        } catch (error) {
            console.log('Erro no servidor '+error);
        }
    })

    const getClient = (async(client_id: number)=>{
        try {
            const client = await db.cliente.findOne({where: {id: client_id},
                include: [
                    {
                        model: db.invoice,
                        where: {state: 'Cotação'},
                        separate: true,
                        include: [
                            {
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
                            },
                            {
                                model: db.delivery,
                            }
                        ],
                        required: false
                    },
                    {
                        model: db.delivery,
                    },
                    {
                        model: db.currencyClient,
                    }
                ]
            })
            if (!client.invoices) {
                client.invoices = []
            }
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

    const saveClientAddress = (async(req: Request,res:Response)=>{
        if (req.body.localisation == "" || 
            req.body.country == "" ||
            req.body.county == "" ||
            req.body.city == "") {
            return res.status(500).json({message: 'Por favor preeche todos os campos'})
        }
        try {
            await db.delivery.upsert({
                id: req.body.id, // ou a propriedade chave primária do seu modelo
                city: req.body.city,
                client_id: req.body.client_id,
                phone: req.body.phone,
                country: req.body.country,
                county: req.body.county,
                neighborhood: req.body.neighborhood,
                road: req.body.road,
                housNumber: req.body.housNumber,
                comment: req.body.comment,
                localisation: req.body.localisation,
                state: true,
            });
            return res.json({data:await getClient(req.body.client_id),message: 'Success'})
        } catch (error) {
            res.status(500).json({message: "Aconteceu um erro no servidor por favor tenta novamente mais tard"})
            console.log(error);
        }
    })

    const deleteAddress = async(req: Request,res:Response)=>{
        try {
            const address = await db.delivery.findOne({where:{id:req.params.address_id}})
            await address.destroy()
            return res.json({data:await getClient(Number(req.params.client_id)),message: 'Success'})
        } catch (error) {
            console.log(error);
            
            return res.status(500).json({message: 'Aconteceu um erro no servidor por favor tenta novamente mais tarde'})
        }
    }

    return {createClient,getClient,changeCurrency,getClients,saveClientAddress,deleteAddress}
})