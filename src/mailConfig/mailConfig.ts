import * as nodemailer from 'nodemailer';

export const mailConfig = () => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'Gmail',
        auth: {
            user: 'leonardovandunen@gmail.com',
            pass: 'vdzrtreztuujiyqn'
        },
        
        tls: {
            rejectUnauthorized: false,
        },
    });

  return {transporter}
}