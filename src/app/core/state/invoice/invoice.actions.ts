import { createAction, props } from "@ngrx/store";
import { IInvoice } from "../../interfaces/invoice.interface";

export const loadInvoice = createAction('[Invoice Api] Loads invoice');
export const loadInvoiceSuccess = createAction(
    '[Invoice Api] Loads invoice successfully',
    props<{invoice: IInvoice}>(),
);
export const loadInvoiceFail = createAction(
    '[Invoice Api] Loads invoice failed',
    props<{error: string}>(),
)