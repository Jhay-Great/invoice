import { LoadDataInterface } from "./loadData.interface"
import { InvoiceState } from "../state/invoice/reducers/loadData.reducer"

// import the invoice model
import { Invoice } from "../model/invoice.model"

export interface AppState {
    invoice: InvoiceState,
    // theme:
}

// export interface InvoiceFeature {
//     dataLoadingFeature: InvoiceState,
// }