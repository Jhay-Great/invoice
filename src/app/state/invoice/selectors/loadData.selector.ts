import { createSelector } from "@ngrx/store";

import { AppState } from "../../../interfaces/AppState.interface";
import { InvoiceState } from "../reducers/loadData.reducer";

const loadInvoiceFeature = (state:AppState) => state.invoice;

export const selectLoadInvoice = createSelector(
    loadInvoiceFeature,
    (invoiceFeature: InvoiceState) => {
        return invoiceFeature.filteredData; // selector now selects the filtered data by default
    }
    
);

// const loading = (state:AppState) => state.invoice;
export const selectLoadState = createSelector(
    loadInvoiceFeature, 
    (invoiceFeature:InvoiceState) => invoiceFeature.loading,
)


