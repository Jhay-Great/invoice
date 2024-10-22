import { createReducer, on } from "@ngrx/store";
import { filterAction, loadInvoice, loadInvoiceFail, loadInvoiceSuccess } from "./invoice.actions";
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
    on(filterAction,  (state, { filter }) => ({...state, filterBy: {...filter}}))
)