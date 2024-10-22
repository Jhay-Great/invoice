import { createSelector } from "@ngrx/store";
import { AppState } from "../state.interface";

const invoiceSelector = (state:AppState) => state.invoice;

// filter selector
const filterSelector = createSelector(
    invoiceSelector,
    (invoice) => invoice.filterBy
)

export const selectAllInvoice = createSelector(
    invoiceSelector,
    
    (invoice) => {
        const filterCategory = Object.keys(invoice.filterBy).filter(
            category => invoice.filterBy[category]
        );
        const invoiceData =invoice.invoice;

        if (filterCategory.length !== 0) {
            console.log('category: ', filterCategory);
            return invoiceData.filter(invoice => filterCategory.includes(invoice.status))

        }
        
        return invoice.invoice
    }
)

export const selectInvoiceById = (id:string) => createSelector(
        invoiceSelector,
        (invoice) => {
            const searchInvoice = invoice.invoice.filter(data => data.id === id);
            console.log(searchInvoice);
            return searchInvoice;
        }
    )





// loading state selector
export const selectLoadingState = createSelector(
    invoiceSelector,
    (invoice) => invoice.loading
)
// error selector
export const selectError = createSelector(
    invoiceSelector,
    (invoice) => invoice.error
)