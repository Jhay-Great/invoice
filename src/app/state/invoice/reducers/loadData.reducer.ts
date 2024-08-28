import { Action, createReducer, on } from '@ngrx/store';

// local import
import {
  onLoadDataAction,
  loadDataOnSuccess,
  loadDataOnFailure,
  // dataLoadingActions,
} from '../actions/loadData.action';
import { LoadDataInterface } from '../../../interfaces/loadData.interface';

export interface InvoiceState {
  data: LoadDataInterface[];
  loading: boolean;
  error: string;
}

const initialState:InvoiceState = {
  data: [],
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
        data:data,
        loading: true,
      }
    }),
    on(loadDataOnFailure, (state, { error }) => ({
      ...state,
      data: [],
      loading: false,
      error: error,
    }))
);

// export const loadDataReducer = function (
//   state: InvoiceInterface,
//   action: Action
// ) {
//   return _loadDataReducer(state, action);
// };

// export function loadDataReducer(
//     state: InvoiceInterface | undefined,
//     action: Action
//   ): InvoiceInterface {
//     return _loadDataReducer(state ?? initialState, action); // Handle undefined state
//   }

// export function reducers(state:counterType | undefined, action:counterActions): counterType {
//     return _counterReducer(state, action)
// }

// export function numberCounterReducers(
//     state: counterType | undefined,
//     action: Action
//   ): counterType {
//     return _counterReducer(state, action as any);
//   }

/**Reducer
 * IMPORTANT: initial state,
 * IMPORTANT: state function on() to trigger the action
 */
