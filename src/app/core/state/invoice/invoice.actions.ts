import { createAction, props } from "@ngrx/store";
import { IFilter, IInvoice } from "../../interfaces/invoice.interface";

export const loadInvoice = createAction('[Invoice Api] Loads invoice');
export const loadInvoiceSuccess = createAction(
    '[Invoice Api] Loads invoice successfully',
    props<{invoice: IInvoice[]}>()
);
export const loadInvoiceFail = createAction(
    '[Invoice Api] Loads invoice failed',
    props<{ error: string | null }>()
)

// filter action
export const filterAction = createAction(
    '[filter Invoice Api] Filters invoice data',
    props<{filter: IFilter}>()
)

// CRUD operations
export const createInvoice = createAction(
    '[Invoice Api] Creates invoice',
    props<{invoiceData: IInvoice}>()
)

export const deleteInvoice = createAction(
    '[Invoice Api] Deletes invoice',
    props<{ id: string }>(),
)

// mark as paid
export const markInvoiceAsPaid = createAction(
    '[Invoice Api] Marks invoice as paid',
    props<{id: string}>(),
)
