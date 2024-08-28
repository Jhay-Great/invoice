import { createSelector } from "@ngrx/store";

import { AppState, InvoiceFeature } from "../../../interfaces/AppState.interface";
import { LoadingState } from "../reducers/loadData.reducer";

const loadInvoiceFeature = (state:AppState) => state.invoice;

export const selectLoadInvoice = createSelector(
    loadInvoiceFeature,
    (invoiceFeature: LoadingState) => {
        console.log(invoiceFeature.data);
        return invoiceFeature.data
    }
    // (state:InvoiceFeature) => state.dataLoadingFeature.data
//     // (state:InvoiceFeature) => {
//     //     console.log('laoding: ', state.dataLoadingFeature.loading)
//     //     return state.dataLoadingFeature.data
//     // }
);

const loading = (state:AppState) => state.invoice;
export const selectLoadState = createSelector(
    loading, 
    (load:LoadingState) => load.loading,
)


