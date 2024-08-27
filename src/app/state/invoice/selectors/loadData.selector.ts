import { createSelector } from "@ngrx/store";

import { AppState, InvoiceFeature } from "../../../interfaces/AppState.interface";

const loadInvoiceFeature = (state:AppState) => state.invoice;

export const selectLoadInvoice = createSelector(
    loadInvoiceFeature,
    (state:InvoiceFeature) => state.dataLoadingFeature
)