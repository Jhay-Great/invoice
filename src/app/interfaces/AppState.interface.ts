import { LoadDataInterface } from "./loadData.interface"
import { LoadingState } from "../state/invoice/reducers/loadData.reducer"

export interface AppState {
    invoice: LoadingState,
    // theme:
}

export interface InvoiceFeature {
    dataLoadingFeature: LoadingState,
}