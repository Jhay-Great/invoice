import { createSelector } from '@ngrx/store';

import { AppState } from '../../../interfaces/AppState.interface';
import { InvoiceState } from '../reducers/loadData.reducer';
import { FilterCriteriaType } from '../actions/filterInvoice.action';

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
    // console.log(invoiceFeature, selectFilter);
    if (!selectFilter.draft && !selectFilter.paid && !selectFilter.pending) {
      return invoiceFeature.filteredData;
    }
    // return;
    return invoiceFeature.data.filter(
      (invoice) =>
        (selectFilter.paid && invoice.status === 'paid') ||
        (selectFilter.pending && invoice.status === 'pending') ||
        (selectFilter.draft && invoice.status === 'draft')
    );
    // return invoiceFeature.filteredData; // selector now selects the filtered data by default
  }
);

// const loading = (state:AppState) => state.invoice;
export const selectLoadState = createSelector(
  loadInvoiceFeature,
  (invoiceFeature: InvoiceState) => invoiceFeature.loading
);

