
export interface Product{
  id:number,
  nome: string,
  company_id: number,
  image: string,
  category_product_id: number,
  product_type_id: number,
  fabricante: string,
  preçocust: number,
  imposto: string,
  preçovenda: number,
  preco_medio: number,
  estado: number
}
export interface ItemInvoice {
    id: number
    invoice_id: number;
    produtos_id: number;
    armagen_id: number;
    quantity: number;
    PriceCost: number;
    PriceSold: number;
    Discount: number;
    tax: number;
    totalTax: number;
    TotalDiscount: number;
    final_price: number;
    TotalCost: number;
    TotalSold: number;
    produto: Product
  }
  
  export interface TypeInvoice {
    id: number;
    orderNumber: string;
    company_id: number;
    user_id: number;
    cliente_id: number;
    TotalInvoice: number;
    discount: number;
    TotalMerchandise: number;
    tax: number;
    state: string;
    DateOrder: string;
    DateDue: string;
    RestPayable: number;
    invoice_items: ItemInvoice[]
}

export interface ClientTypeScript{
  id: number
  company_id: number,
  image: string,
  surname: string,
  name: string,
  email: string,
  whatssap: string,
  phone: string,
  city: string,
  country: string,
  rua: string,
  state: string,
  invoices: TypeInvoice
  password: string
}