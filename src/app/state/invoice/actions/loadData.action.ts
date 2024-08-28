import { createAction, props } from "@ngrx/store";
import { LoadDataInterface } from "../../../interfaces/loadData.interface";


// defining action type
export const LOAD_INVOICE_DATA = '[Load Invoice] loads initial data'
export const SUCCESS = '[Load Invoice] loads data successfully'
export const FAILURE = '[Load Invoice] Failed to load data'

// defining action creator
export const onLoadDataAction = createAction(LOAD_INVOICE_DATA);
export const loadDataOnSuccess = createAction(
    SUCCESS,
    props<{data: LoadDataInterface[]}>()
)
export const loadDataOnFailure = createAction(
    FAILURE,
    props<{error: string}>()
)










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
