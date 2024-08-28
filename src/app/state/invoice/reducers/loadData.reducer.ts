import { Action, createReducer, on } from '@ngrx/store';

// local import
import {
  onLoadDataAction,
  loadDataOnSuccess,
  loadDataOnFailure,
  // dataLoadingActions,
} from '../actions/loadData.action';
import { LoadDataInterface } from '../../../interfaces/loadData.interface';
import { detailedInvoice, FilterCriteriaType, filterInvoice } from '../actions/filterInvoice.action';

export interface InvoiceState {
  data: LoadDataInterface[];
  filteredData: LoadDataInterface[];
  filterCriteria: FilterCriteriaType;
  selectedInvoiceId: string;
  // filterCriteria: string;
  loading: boolean;
  error: string;
}

const initialState:InvoiceState = {
  data: [],
  filteredData: [],
  filterCriteria: {paid: false, pending: false, draft: false},
  selectedInvoiceId: '',
  loading: false,
  error: '',
};

export const loadDataReducer = createReducer(
  initialState,
  on(onLoadDataAction, (state) => ({
    ...state,
  })),
    on(loadDataOnSuccess, (state, { data }) => {
      // console.log(data);
      return {
        ...state,
        data: data,
        filteredData: data,
        loading: true,
      }
    }),
    on(loadDataOnFailure, (state, { error }) => ({
      ...state,
      error: error,
    })),
    on(filterInvoice, (state, {filterCriteria}) => {
      // console.log(filterCriteria)
      return {
        ...state,
        filterCriteria,
      }
    }),
    on(detailedInvoice, (state, {selectedInvoiceId}) => ({
      ...state, 
      selectedInvoiceId
    })),
    
);
















