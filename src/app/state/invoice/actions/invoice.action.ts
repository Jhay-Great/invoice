import { createActionGroup, emptyProps, props } from "@ngrx/store";

// local imports
import { Invoice } from "../../../model/invoice.model";
import { LoadDataInterface } from "../../../interfaces/loadData.interface";
import { FilterCriteriaType } from "./filterInvoice.action";

export const InvoiceAction = createActionGroup({
    source: 'Invoice',
    events: {
        // load actions
        'Fetch Invoice': emptyProps(),
        'Load Invoice on Success': props<{data: LoadDataInterface[]}>(),
        'Failed to load Invoice': props<{error: string}>(),

        // filter actions
        'Filters invoice data': props<{filterCriteria: FilterCriteriaType}>(),

        // select invoice id
        'Selects a specific id': props<{selectedInvoiceId: string}>(),

        // CRUD operations

    }
})



// const FILTER = '[Filter] filtering invoice data'
// export const filterInvoice = createAction(
//     FILTER,
//     props<{filterCriteria: FilterCriteriaType}>(),
// )

// // selected invoice
// const SELECTED_INVOICE = '[Selected invoice] routes to the selected invoice';
// export const detailedInvoice = createAction(
//     SELECTED_INVOICE,
//     props<{selectedInvoiceId: string}>(),
// )
