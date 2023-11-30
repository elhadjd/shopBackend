import { Request, Response } from "express";
import { Op } from "sequelize";
const db = require('../../db/models/index');
export class SearchProducts{
    public async search(req:Request,res:Response){
        try {
            const results = await db.produto.findAll({
              where: {
                nome: {
                  [Op.like]: `%${req.params.name}%`,
                },
              },
              limit: 100
            });
        
            return res.status(200).json(results);
        } catch (error) {
            res.status(401).json('Erro ao pesquisar produtos:'+error)
            throw error;
        }
    }
}