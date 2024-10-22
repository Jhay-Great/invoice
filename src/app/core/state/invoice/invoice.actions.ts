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
