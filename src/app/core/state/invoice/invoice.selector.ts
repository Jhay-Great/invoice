import { createSelector } from "@ngrx/store";
import { AppState } from "../state.interface";

const invoiceSelector = (state:AppState) => state.invoice;

export const selectAllInvoice = createSelector(
    invoiceSelector,
    (invoice) => invoice.invoice
)
export const selectLoadingState = createSelector(
    invoiceSelector,
    (invoice) => invoice.loading
)
export const selectError = createSelector(
    invoiceSelector,
    (invoice) => invoice.error
)