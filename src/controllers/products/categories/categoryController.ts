import { Request, Response } from "express"

const db = require('../../../db/models')

export function categoriesController() {
    const getCategories = (async(req: Request,res: Response)=>{
        const id = req.params.id
        if (id) {
            const category = await db.category_products.findOne({
                where: {id: Number(id)},
                include: [
                    {
                        model: db.sub_category,
                        required: false,
                        include: [
                            {
                                model: db.produto
                            }
                        ]
                    },
                    {
                        model: db.produto,
                        where: {estado: 'active'},
                        required: false
                    }
                ]
            })
            return res.status(200).json(category)
        }
        const categories = await db.category_products.findAll({
            include: [{
                model: db.sub_category
            }]
        })
        res.json(categories)
    })
    return {getCategories}
}
