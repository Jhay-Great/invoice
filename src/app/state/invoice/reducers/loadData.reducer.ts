import { Action, createReducer, on } from '@ngrx/store';

// local import
import {
  loadData,
  loadDataAction,
  loadDataFailure,
  loadDataSuccess,
  dataLoadingActions,
} from '../actions/loadData.action';
import { LoadData } from '../../../interfaces/loadData.interface';

export interface LoadingState {
  data: LoadData[];
  loading: boolean;
  error: string;
}

const initialState = {
  data: [
    {
      id: 'RT3080',
      createdAt: '2021-08-18',
      paymentDue: '2021-08-19',
      description: 'Re-branding',
      paymentTerms: 1,
      clientName: 'Jensen Huang',
      clientEmail: 'jensenh@mail.com',
      status: 'paid',
      senderAddress: {
        street: '19 Union Terrace',
        city: 'London',
        postCode: 'E1 3EZ',
        country: 'United Kingdom',
      },
      clientAddress: {
        street: '106 Kendell Street',
        city: 'Sharrington',
        postCode: 'NR24 5WQ',
        country: 'United Kingdom',
      },
      items: [
        {
          name: 'Brand Guidelines',
          quantity: 1,
          price: 1800.9,
          total: 1800.9,
        },
      ],
      total: 1800.9,
    },
  ],
  loading: true,
  error: '',
};

export const _loadDataReducer = createReducer(
  initialState,
  on(loadDataAction, (state) => ({
    ...state,
    loading: true,
    error: '',
  })),
    on(loadDataSuccess, (state, { data }) => {
      console.log(data);
      return {
        ...state,
        data:data
      }
    }),
    on(loadDataFailure, (state, { error }) => ({
      ...state,
      // data: [],
      loading: false,
      error: error,
    }))
);

// export const loadDataReducer = function (
//   state: LoadingState,
//   action: Action
// ) {
//   return _loadDataReducer(state, action);
// };

// export function loadDataReducer(
//     state: LoadingState | undefined,
//     action: Action
//   ): LoadingState {
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
