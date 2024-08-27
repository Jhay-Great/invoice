import { createAction, props } from '@ngrx/store';

// local imports
import { LoadData } from '../../../interfaces/loadData.interface';

// defining action type
export const loadData = '[LOAD_DATA_FUNCTIONALITY] loads initial invoice data';

// defining action creator
export const loadDataAction = createAction(loadData);
export const loadDataSuccess = createAction(
  '[Data] Load Data Success',
  props<{ data: LoadData }>()
);
export const loadDataFailure = createAction(
  '[Data] Load Data Failure',
  props<{ error: string }>()
);

// creating action unions
export type dataLoadingActions =
  | ReturnType<typeof loadDataAction>
  | ReturnType<typeof loadDataSuccess>
  | ReturnType<typeof loadDataFailure>;

  

  
/**Action
 * this is a function which is used to trigger an event.
 * actions are use by reducers to perform an action or function
 * when the reducers needs to communicate with the store, actions are the propagators of that, or the initiators
 * action can be associated to the event method which triggers an event listener when you compare it to DOM JS knowledge or understanding
 *
 * IMPORTANT: type
 * IMPORTANT: props / payload
 *
 * an action creator takes in two parameters
 *  a type which is used to determine the action that is being triggered
 *  a prop which carries a payload
 */
