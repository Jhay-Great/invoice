import { createAction, props } from "@ngrx/store";

// define an interface for your payload
// create the action type
// create the action creator

const DRAFT = '[Filter] filters by draft';
const PENDING = '[Filter] filters by pending';
const PAID = '[Filter] filters by paid';
const ALL = '[Filter] removes filtering options' //thinking...

// export const removeInvoiceFilter
export const filterInvoiceByDraft = createAction(
    DRAFT,
    props<{filterCriteria: string}>(),
);
export const filterInvoiceByPending = createAction(PENDING);
export const filterInvoiceByPaid = createAction(PAID);


const FILTER = '[Filter] filtering invoice data'
export const filterInvoice = createAction(
    FILTER,
    props<{filterCriteria: string}>(),
)
