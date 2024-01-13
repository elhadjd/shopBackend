import { Request, Response, response } from 'express';
import { mailConfig } from '../../../mailConfig/mailConfig';
import * as fs from 'fs';
import path from 'path';
import { ClientTypeScript, ItemInvoice } from '../../types';

export const sendEmailCheckoutController = (()=>{
    const {transporter} = mailConfig()

    const newMessage = (async(data:ClientTypeScript)=>{
    const productListHTML = generateProductListHTML(data.invoices[0].invoice_items);
        const htmlFilePath = path.resolve(__dirname, 'client-email-template.html');
        const html = fs.readFileSync(htmlFilePath, 'utf-8');
        const styledHtml = html
        .replace('{{name}}', data.name)
        .replace('{{email}}', data.email)
        .replace('{{phone}}',data.phone)
        .replace('{{products}}',productListHTML)
        .replace('{{invoiceNumber}}',data.invoices[0].orderNumber)
        .replace('{{purchaseDate}}',data.invoices[0].DateDue)
        const mailOptions: {from: string,to: string,subject: string,html: string,text: string} = {
            from: data.email,
            to: data.email,
            subject: 'Your order at sigesc',
            html: styledHtml,
            text: ''
        };

        return new Promise((resolve,reject)=>{
            transporter.sendMail(mailOptions,async function(error,info){
                if (error) {
                    reject('Erro ao envia o email, por favor verifique se o email esta correto e tente novamente !!!')
                }else{
                    await senMailToCompany(data)
                    resolve('Mesagem enviada com sucesso sera contactado asim que posivel. \n OBRIGADO POR CANTACTAR')
                }
            })
        })
    })

    const senMailToCompany = async(data:ClientTypeScript)=>{
        const htmlFilePathCompany = path.resolve(__dirname, 'company-email-template.html');
        const productListHTML = generateProductListHTML(data.invoices[0].invoice_items);
        const htmlCompany = fs.readFileSync(htmlFilePathCompany, 'utf-8');
        const styledHtmlCompany = htmlCompany
        .replace('{{name}}', data.name)
        .replace('{{email}}', data.email)
        .replace('{{phone}}',data.phone)
        .replace('{{products}}',productListHTML)
        .replace('{{invoiceNumber}}',data.invoices[0].orderNumber)
        .replace('{{purchaseDate}}',data.invoices[0].DateDue)
        .replace('{{companyName}}',data.invoices[0].company.name)
        const mailOptionsCOmpany: {from: string,to: string,subject: string,html: string,text: string} = {
            from: 'leonardovandunen@gmail.com',
            to: 'leonardovandunen@gmail.com',
            subject: 'Your order at sigesc',
            html: styledHtmlCompany,
            text: ''
        };

        return new Promise((resolve,reject)=>{
            transporter.sendMail(mailOptionsCOmpany,async function(error,info){
                if (error) {
                    reject('Erro ao envia o email, por favor verifique se o email esta correto e tente novamente !!!')
                }else{
                    
                    resolve('Mesagem enviada com sucesso sera contactado asim que posivel. \n OBRIGADO POR CANTACTAR')
                }
            })
        })
    }

    function generateProductListHTML(items_invoice: ItemInvoice[]): string {
    
        const productListHTML = '<ul style="list-style: none; padding: 0; margin-top: 20px;">' +
            items_invoice.map((product: ItemInvoice) => `
                <li style="margin-bottom: 20px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; padding: 10px; background-color: #fff;">
                    <div style="display: flex; align-items: center;">
                        <img src="https://geral.sisgesc.net/produtos/image/${product.produto.image}" alt="${product.produto.nome}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 50%; margin-right: 10px;">
                        <div>
                            <h3 style="margin: 0; color: #3498db;">${product.produto.nome}</h3>
                            <p style="margin: 0; color: #555;">Quantity: ${product.quantity}</p>
                            <p style="margin: 0; color: #555;">Price: $${product.PriceSold}</p>
                        </div>
                    </div>
                </li>
            `).join('') +
        '</ul>';
    
        return productListHTML;
    }
    return {newMessage}
})