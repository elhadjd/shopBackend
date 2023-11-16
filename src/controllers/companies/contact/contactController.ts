import { Request, Response, response } from 'express';
import { mailConfig } from '../../../mailConfig/mailConfig';
import * as fs from 'fs';
import path from 'path';
import { messageTypeData } from '../../types';

export const contactController = (()=>{
    const {transporter} = mailConfig()
    const newMessage = (async(data:messageTypeData,emailToSend:string)=>{
        const htmlFilePath = path.resolve(__dirname, 'email-template.html');
        const html = fs.readFileSync(htmlFilePath, 'utf-8');
        const styledHtml = html
        .replace('{{name}}', data.name)
        .replace('{{email}}', data.email)
        .replace('{{message}}',data.message)
        .replace('{{tel}}',data.tel)
        .replace('{{surname}}',data.surname||'');
        const mailOptions: {from: string,to: string,subject: string,html: string,text: string} = {
            from: data.email,
            to: emailToSend,
            subject: 'Um novo contacto',
            html: styledHtml,
            text: ''
        };
        return new Promise((resolve,reject)=>{
            transporter.sendMail(mailOptions,async function(error,info){
                if (error) {
                    reject('Erro ao envia o email, por favor verifique se o email esta correto e tente novamente !!!')
                }else{
                    resolve('Mesagem enviada com sucesso sera contactado asim que posivel. \n OBRIGADO POR CANTACTAR')
                }
            })
        })
    })
    return {newMessage}
})