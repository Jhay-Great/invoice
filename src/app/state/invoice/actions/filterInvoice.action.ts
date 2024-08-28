import { createAction } from "@ngrx/store";


// create the action type
// create the action creator

const DRAFT = '[Filter] filters by draft';
const PENDING = '[Filter] filters by pending';
const PAID = '[Filter] filters by paid';

export const filterByDraft = createAction(DRAFT);
export const filterByPending = createAction(DRAFT);
export const filterByPaid = createAction(DRAFT);
