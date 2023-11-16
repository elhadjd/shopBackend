import { Request, Response } from "express"
const db = require('../../db/models');
export const productController = (()=>{

    const getProduct = (async(req: Request,res: Response)=>{
        const productId = req.params.productId
        const query = await db.produto.findOne({where: {id: productId},
            include: [
                {
                    model: db.stocks,
                },
                {
                    model: db.company
                },
                {
                    model: db.product_picture
                },
                {
                    model: db.productPromotions
                },
                {
                    model: db.category_products,

                    include: [
                        {
                            model: db.produto
                        },
                        {
                            model: db.sub_category
                        }
                    ]
                }
            ],
        })
        return res.status(200).json(query)
    })
    
    return {getProduct}
})