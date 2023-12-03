
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
  company: CompanyTs,
  estado: number,
  productPromotions: productPromotions[]
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
  currencyClient: currencyClientTs,
  rua: string,
  state: string,
  invoices: TypeInvoice[]
  token: string,
  user_id_clerk: string
}

export interface currencyClientTs {
  id: bigint,
  code: string,
  currency: string,
  digits: string,
  number: number,
  client_id: bigint,
}

export interface currencyCompanyTs {
  id: bigint,
  code: string,
  currency: string,
  digits: string,
  number: number,
  company_id: bigint,
}

export interface productPromotions{
  id: number,
  name: string,
  product_id: number,
  startDate: string,
  endDate: string
}

export interface CompanyTs{
  activity_type_id:number,
  activity_type: typeActivity,
  city:string,
  country: string,
  email:string,
  house_number: string,
  id:number,
  image:string,
  manager: number,
  name:string,
  nif:string,
  phone:string,
  sede:string,
  description:string,
  currencyCompany: currencyCompanyTs,
  produtos: Product[],
  companyRatting: companyRatting[]
}

export interface companyRatting{
  company_id: number,
  client_id: number,
  ratting: number,
  comment: string,
  createdAt: string,
  updatedAt: string
}

export interface typeActivity{
  name: string
}

export interface messageTypeData{
  name: string,
  tel: string, 
  email: string, 
  surname?: string, 
  message: string, 
}