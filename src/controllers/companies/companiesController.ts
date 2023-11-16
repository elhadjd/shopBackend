import { Request, Response } from "express";
const db = require('../../db/models/index');
export class companies{
    public async getCompanies(req:Request,res: Response):Promise<Response> {
        const companies = await db.company.findAll({
            include:[
                {
                    model: db.activity_type
                }
            ]
        })
        return res.status(200).json(companies)
    }
}
