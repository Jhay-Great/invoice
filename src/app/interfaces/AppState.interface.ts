import { LoadData } from "./loadData.interface"

export interface AppState {
    invoice: InvoiceFeature,
    // theme:
}

export interface InvoiceFeature {
    dataLoadingFeature: LoadData[],
}