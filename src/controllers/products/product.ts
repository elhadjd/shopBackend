import { Request, Response } from "express"
import { where } from "sequelize";
const db = require('../../db/models');
export const productController = (()=>{

    const getProduct = (async(req: Request,res: Response)=>{
        const productId = req.params.productId
        try { 
            const query = await db.produto.findOne({where: {id: productId},
                include: [
                    {
                        model: db.stocks,
                    },
                    {
                        model: db.company,
                        include: [{
                            model:db.currencyCompany
                        }]
                    },
                    {
                        model: db.product_comments
                    },
                    {
                        model: db.product_likes
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
                                model: db.produto,
                                where: {shop_online: true,estado:'active'},
                                include: [
                                    {
                                        model: db.company,
                                        include: [{
                                            model:db.currencyCompany
                                        }]
                                    }
                                ]
                            },
                            {
                                model: db.sub_category
                            },
                            
                        ]
                    }
                ],
            })
            return res.status(200).json(query)
            
        } catch (error) {
            return res.status(500).json({message: 'Erro no servidor '+error})
        }
    })

    const likeAnComment = (async(req:Request,res: Response)=>{
        const client = await db.cliente.findOne({where: {id: req.body.client}})

        if(client){
            if(req.body.type == 'like'){
                try {
                    const like = await db.product_likes.findOne({where: {client_id: req.body.client,product_id: req.body.productId}})
                    req.params.productId = req.body.productId
                    if (like) {
                        await like.destroy()
                        return getProduct(req,res)
                    }
                    await db.product_likes.create({
                        client_id: client.id,
                        product_id: req.body.productId
                    })
                    return getProduct(req,res)
                } catch (error) {
                    return res.json({message: 'Erro do servidor '+error})
                }
            }
        }
        return res.json({message: 'Usuario não encontrado por favor tenha certeja de fazer login e tentar novamente '});
    })
    
    return {getProduct,likeAnComment}
})