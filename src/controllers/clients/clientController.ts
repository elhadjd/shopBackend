import { Request, Response } from "express";
import { validationResult  ,query,body} from "express-validator"
const db = require("../../db/models");
import bcrypt from 'bcryptjs'
import { ClientTypeScript } from "../types";

export const ClientServices = (()=>{
    const createClient = (async(req: Request,res: Response)=>{
        const result = validationResult(req)
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt);
        if (!result.isEmpty()) {
            return res.json(result.array())
        }
        const [item,create] = await db.cliente.findOrCreate({
            where: [{email: req.body.email}],
            defaults: {
                company_id: 1,
                name: req.body.name,
                email: req.body.email,
                password: hash,
                image: 'produto-sem-imagem.png',
            }
        })
        if(create) return res.json({message: 'Dados cadastrados com sucesso, ja podes fazer login',type: 'success'})
        return res.json({message: 'Este email ja se encontra cadastrado',type: 'warn'})
    })

    const Login = (async(req: Request,res:Response)=>{
        const result = validationResult(req)
        if(!result.isEmpty) return res.json(result.array())
        const client:ClientTypeScript = await db.cliente.findOne({where: {email: req.body.email}})
        if (!client) return res.json({message: 'Dados incorretos',type: 'info'})
        if (client.password == '') return res.json({message: 'Dados incorretos',type: 'info'})
        if (bcrypt.compareSync(req.body.password,client.password)) {
            const returnClient = await db.cliente.findOne({where: {id: client.id},include:[{
                model: db.invoice,
                include: [{
                    model: db.invoice_item,
                    include:[{
                        model: db.produto
                    }]
                }]
            }]})
            return res.json(returnClient).status(200)
        }
        return res.json({message: 'Dados incorretos',type: 'info'})
    })
    return {createClient,Login}
})