import { ClientTypeScript, ItemInvoice, TypeInvoice } from "../types";
const pup = require('puppeteer');

export const useConvertMoneyController = (()=>{
    const pup = require('puppeteer');
    const converter = async(client:ClientTypeScript)=>{
        for (const order of client.invoices) {
            order.TotalInvoice = 0;
        
            for (const item of order.invoice_items) {
                if (item.produto.company.currencyCompany.currency != client.currencyClient.currency) {
                    const url = `https://www.google.com/search?q=${item.TotalSold}+${item.produto.company.currencyCompany.currency}+em+${client.currencyClient.currency}&oq=${item.TotalSold+item.produto.company.currencyCompany.currency}+em+${client.currencyClient.currency}&gs_lcrp=EgZjaHJvbWUqCggBEAAYChgWGB4yBggAEEUYOTIKCAEQABgKGBYYHtIBCTMzNzM5ajFqOagCALACAA&sourceid=chrome&ie=UTF-8`;
                    const browser = await pup.launch({headless: false});
                    const page = await browser.newPage();
                    await page.goto(url);
                    const moneyResult = await page.$eval('.a61j6', (element: { value: any; }) => element.value);
                    await browser.close();
                    item.PriceSold = moneyResult/item.quantity
                    item.TotalSold = Number(moneyResult);
                    order.TotalInvoice += Number(moneyResult);
                }
            }
        }
        return client
    }
    return {converter}
})