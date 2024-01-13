import { Request, Response } from "express"
import { ClientServices } from "../clients/clientController"
import { TypeInvoice } from "../types"
import * as http from 'https';
import { sendEmailCheckoutController } from "./sendEmail/sendEmail";
const db = require('../../db/models')
export const checkoutController = (()=>{
    const {newMessage} = sendEmailCheckoutController()
    const stripe = require('stripe')('sk_test_51MXf81DdAzxghTUfjMoToD2TCh0F7gMvlgWCbb0ZVADduc1zs0voO6jZgxWWgooNuAnFltGtKzyw7sKzGU9Tja0U00vozgF46E');
    const {getClient} = ClientServices()
    const submitCheckout = (async(req: Request,res: Response)=>{
        const client = await db.cliente.findOne({where:{id: req.body.client.id}})
        try {
            if (client) {
                await client.update({
                    phone: req.body.client.phone,
                    default_address:req.body.client.default_address
                })
                const invoices = await db.invoice.findAll({where: {cliente_id: client.id,state: 'Cotação'}})
                invoices.forEach(async (invoice:TypeInvoice) => {
                    await db.invoice.update({delivery_id: client.default_address},{where:{id:invoice.id}})
                });
                return res.json(await getClient(client.id))
            }
            return res.json({message: 'Usuario nâo encontrado por favor faz login e tenta novamente OBRIGADO',type: 'error'}).status(200)
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Erro no servidor'+error})
        }
    })

    const getStripePayment = (async(sessionId: string)=>{
        try {
            const payment = await stripe.checkout.sessions.retrieve(sessionId);
           return payment
        } catch (erro) {
            console.error('Erro ao recuperar pagamento:', erro);
        }
    })

    // const registerSigescPayment = async (stripe: any): Promise<void> => {
    //     const url = new URL(`https://geral.sisgesc.net/Faturacao/sendPayment/${stripe.metadata.orderId}`);
      
    //     const dataSend = JSON.stringify({ 
    //         Amount: stripe.amount_total,
    //         TotalPayments: 0,
    //         payment_method_id:3
    //     });
      
    //     const optionRequest: http.RequestOptions = {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Content-Length': Buffer.byteLength(dataSend),
    //       },
    //     };
      
    //     return new Promise<void>((resolve, reject) => {
    //       const request = http.request(url, optionRequest, (response) => {
    //         let dados = '';
      
    //         response.on('data', (chunk) => {
    //           dados += chunk;
    //         });
      
    //         response.on('end', () => {
    //           console.log('Resposta da API:', dados);
    //           resolve();
    //         });
    //       });
      
    //       request.on('error', (erro) => {
    //         console.error('Erro na requisição:', erro);
    //         reject(erro);
    //       });
    //       request.write(dataSend);
    //       request.end();
    //     });
    // };


    const registerSigescPayment = async (stripe: any,stripeSession: string): Promise<void> => {
        const order = await db.invoice.findOne({where:{id:stripe.metadata.orderId}})
        if(order.state == "Pago"){
            return order
        }
        try {
            const payment = await db.payment_invoice.create({
                payment_method_id:3,
                invoice_id: stripe.metadata.orderId,
                Amount: stripe.amount_total,
                TotalPayments:0
            })
            await order.update({state: "Pago",DateDue: Date.now()})
            await db.stripe_payments.create({
                payment_id: payment.id,
               sessionStripeId: stripeSession,
            })
            const client = await db.cliente.findOne({
                where: {id: order.cliente_id},
                include: [
                    {
                        model: db.invoice,
                        where: {id: order.id},
                        include: [{
                            model: db.invoice_item,
                            include:[{
                                model: db.produto,
                            }]
                        },{
                            model:db.company
                        }],
                        required: false
                    }
                ]
            })
            await newMessage(client)
            return client
        } catch (error) {
            console.log("Server Error "+error);
        }
    };

    const RegisterPayment = (async(req: Request,res:Response)=>{
        if(!req.params.order) res.status(500).json({message: "Erro no servidor"})
        if(!req.body.sessionId) res.status(500).json({message: 'Erro no servdor'})
        try {
            const paymentStripe = await getStripePayment(req.body.sessionId)
            if(paymentStripe.payment_status == 'paid' && paymentStripe.status == 'complete'){
                const sigescPayment = await registerSigescPayment(paymentStripe,req.body.sessionId)
                res.json(sigescPayment)
            }else{
                res.json({message: 'Este pagamento precisa ser verificado por favor entre em contacto com conosco atravez do formulario de contatos ou liga para nos. Agradecemos sua compreenção'})
            }
        } catch (error) {
            console.error("Server Error "+error)
            res.status(500).json({message: 'Erro no servdor '+error})
        }
    })
    
    return {submitCheckout,RegisterPayment}
})