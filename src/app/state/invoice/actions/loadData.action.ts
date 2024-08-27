import { createAction } from "@ngrx/store";


// defining action type
export const loadData = '[LOAD_DATA_FUNCTIONALITY] loads initial invoice data'

// defining action creator
export const loadDataAction = createAction(
    loadData,
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
