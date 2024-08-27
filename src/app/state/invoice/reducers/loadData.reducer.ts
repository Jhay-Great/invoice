import { Action, createReducer, on } from '@ngrx/store';

// local import
import {
  onLoadDataAction,
  // loadDataFailure,
  // loadDataSuccess,
  // dataLoadingActions,
} from '../actions/loadData.action';
import { LoadData } from '../../../interfaces/loadData.interface';

export interface LoadingState {
  data: LoadData[];
  loading: boolean;
  error: string;
}

const initialState = {
  data: [],
  loading: true,
  error: '',
};

export const _loadDataReducer = createReducer(
  initialState,
  on(onLoadDataAction, (state) => ({
    ...state,
  })),
    // on(loadDataSuccess, (state, { data }) => {
    //   console.log(data);
    //   return {
    //     ...state,
    //     data:data
    //   }
    // }),
    // on(loadDataFailure, (state, { error }) => ({
    //   ...state,
    //   // data: [],
    //   loading: false,
    //   error: error,
    // }))
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
