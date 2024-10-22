export interface IInvoice {
    id: string;
    createdAt: string;
    paymentDue: string;
    description: string;
    paymentTerms: number;
    clientName: string;
    clientEmail: string;
    status: string;
    senderAddress: ISenderAddress;
    clientAddress: IClientAddress;
    items: IItems[];
    total: number;
}

export interface ISenderAddress {
    street: string;
    city: string;
    postCode: string;
    country: string;
}

export interface IClientAddress {
    street: string;
    city: string;
    postCode: string;
    country: string;
}

export interface IItems {
    name: string;
    quantity: number;
    price: number;
    total: number;
}

export interface IInvoiceState {
    invoice: IInvoice[];
    filterBy: IFilter,
    loading: boolean;
    error: string | null;
}
// filter interface
export interface IFilter {
    [key:string]: boolean; //index signature
  }