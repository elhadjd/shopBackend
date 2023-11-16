import { NextFunction, Request, Response } from "express";
import { CompanyTs } from "../types";
import { contactController } from "./contact/contactController";
const db = require('../../db/models/index');
export class company{
    
    constructor(){
        this.returnCompany
    }

    public async getCompany(req:Request,res: Response):Promise<Response> {
        const companyInstance = new company()
        const companyGet = await companyInstance.returnCompany(Number(req.params.id));
        return res.status(200).json(companyGet)
    }

    private async returnCompany(company_id: number): Promise<CompanyTs | string> {
        try {
            const companies:CompanyTs = await db.company.findOne({
                where: { id: company_id },
                include: [
                    {
                        model: db.activity_type
                    },
                    {
                        model: db.produto,
                        limit: 30,
                        include: [{
                            model: db.stocks,
                        }]
                    },
                    {
                        model: db.companyRatting,
                        order: [
                            ['createdAt', 'ASC']
                        ]
                    }
                ]
            });
    
            return companies || null; // Retorna null se a empresa não for encontrada
        } catch (error) {
            console.error("Erro ao obter empresa:", error);
            return "Erro ao obter empresa:"+ error;
        }
    }
    
    public async registerRatting(req:Request,res: Response):Promise<Response>{
        await db.companyRatting.create({
            company_id: req.body.company_id,
            client_id: req.body.client_id,
            comment: req.body.comment,
            ratting: req.body.ratting,
        })
        const companyInstance = new company()
        const companyGet = await companyInstance.returnCompany(req.body.company_id)
        return res.status(200).json(companyGet)
    }

    public async sendMessage(req:Request,res: Response){
        const {newMessage} = contactController()
        const instanciaCompany = new company()
        const companyTo:any = await instanciaCompany.returnCompany(req.body.company_id)
        if (companyTo.id) {
            newMessage(req.body,companyTo.email)
            .then((message) => {
                return res.json(message).status(200)
            }).catch((error) => {                
                return res.status(401).json(error)
            });
        }
    }
}
