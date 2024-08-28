import { createSelector } from '@ngrx/store';

import { AppState } from '../../../interfaces/AppState.interface';
import { InvoiceState } from '../reducers/loadData.reducer';
import { FilterCriteriaType } from '../actions/filterInvoice.action';
import { LoadDataInterface } from '../../../interfaces/loadData.interface';

const loadInvoiceFeature = (state: AppState) => state.invoice;

export const selectFilter = createSelector(
  loadInvoiceFeature,
  (invoiceFeature: InvoiceState) => {
    return invoiceFeature.filterCriteria;
  }
);

export const selectLoadInvoice = createSelector(
  loadInvoiceFeature,
  selectFilter,
  (invoiceFeature: InvoiceState, selectFilter) => {
    if (!selectFilter.draft && !selectFilter.paid && !selectFilter.pending) {
      return invoiceFeature.filteredData;
    }
    
    return invoiceFeature.data.filter(
      (invoice) =>
        (selectFilter.paid && invoice.status === 'paid') ||
        (selectFilter.pending && invoice.status === 'pending') ||
        (selectFilter.draft && invoice.status === 'draft')
    );
    
  }
);

// select the loading state
export const selectLoadState = createSelector(
  loadInvoiceFeature,
  (invoiceFeature: InvoiceState) => invoiceFeature.loading,
);

// selects the selected invoice
// export const selectInvoice = createSelector(
//   loadInvoiceFeature,
//   (invoiceFeature: InvoiceState) => invoiceFeature.loading,
// );
export const selectInvoice = createSelector(
    loadInvoiceFeature,
    (invoiceFeature: InvoiceState) => {
        
        const { selectedInvoiceId } = invoiceFeature;
        
        const invoice = invoiceFeature.data.filter(data => data.id === selectedInvoiceId);
        return invoice;
        
    },
)

