import { createReducer, on } from "@ngrx/store";
import { createInvoice, deleteInvoice, filterAction, loadInvoice, loadInvoiceFail, loadInvoiceSuccess, markInvoiceAsPaid } from "./invoice.actions";
import { IInvoiceState } from "../../interfaces/invoice.interface";

// initial data
const initialInvoice:IInvoiceState = {
    invoice: [],
    filterBy: {draft: false, pending: false, paid: false},
    loading: true,
    error: null,
}

export const invoiceReducer = createReducer(
    initialInvoice,
    on(loadInvoice, (state) => state),
    on(loadInvoiceSuccess, (state, {invoice}) => (console.log(invoice), {...state, invoice, loading: false})),
    on(loadInvoiceFail, (state, {error}) => ({...state, error, loading: false})),
    on(filterAction,  (state, { filter }) => ({...state, filterBy: {...filter}})),
    on(createInvoice, (state, { invoiceData }) => {
        return {
            ...state,
            invoice: [invoiceData, ...state.invoice],
        }
    }),
    on(deleteInvoice, (state, { id }) => {
        const data = state.invoice.filter(invoice => invoice.id !== id);
        console.log('updated invoice data after deletion: ', data);
        return {
            ...state,
            invoice: data,
        }
    }),
    on(markInvoiceAsPaid, (state, { id }) => {
        const invoice = state.invoice.find(invoice => invoice.id === id);
        if (!invoice) return state;
        const updatedInvoice = {...invoice, status: 'paid'};
        // console.log('updated invoice: ', updatedInvoice);
        // console.log('current state data: ', state);

        const stateUpdate = state.invoice.filter(invoiceData => invoiceData.id!== id);
        const currentInvoiceData = [updatedInvoice, ...stateUpdate]
        console.log('final update: ', currentInvoiceData);
        return {
            ...state,
            invoice: currentInvoiceData
        }

        // return state;
    })
)