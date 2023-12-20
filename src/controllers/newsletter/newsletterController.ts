import { Request, Response } from "express"
const db = require("../../db/models");
export const NewsletterController = (()=>{
    
    const register = (async(req:Request,res:Response)=>{
        if (req.body.email == null || req.body.genre == null || req.body.email == "" || req.body.genre == "") {
            return res.json({message: 'Por favor preenche todos os compos e tenta novamente'})
        }
        try {
            const client = await db.cliente.findOne({where: {email: req.body.email}});
            if (client) {
                const [item,create] = await db.newsletter.findOrCreate({
                    where: {client_id: client.id},
                    defaults:{
                        email: req.body.email,
                        client_id: client.id,
                        genre: req.body.genre,
                        state: false
                    }
                })
                if(create) return res.json({message: 'Agradecemos pela inscrição, enviaremos as novidades no seu email'}).status(200)

                return res.json({message: 'Este email já se encontra cadastrado OBRIGADO'});
            }
            return res.json({message: 'Precisa fazer login para receber novidades'})
            
        } catch (error) {
            return res.json({message:'Erro no servidor'+error})
        }
    })
    return {register}
})