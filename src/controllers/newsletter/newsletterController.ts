import { Request, Response } from "express"

export const NewsletterController = (()=>{
    const register = async(req:Request,res:Response)=>{
        res.json({message: 'Adicinado com sucesso'})
    }
    return {register}
})