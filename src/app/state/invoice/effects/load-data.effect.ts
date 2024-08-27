import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";

// local module imports
import { loadData, loadDataSuccess, loadDataFailure } from "../actions/loadData.action";
import { LoadInvoiceDataService } from "../../../services/load-invoice-data.service";


@Injectable ()
export class LoadDataEffect {
    
    loadData$ = createEffect(() => this.actions$.pipe(
        ofType(loadData),
        mergeMap(
            () => this.invoiceService.fetchInvoiceData().pipe(
                map( data => {
                    // console.log(data);
                    return loadDataSuccess({data})}),
                catchError(error => of(loadDataFailure({error})))
            )
        )
    ));
    
    
    constructor (
        private actions$: Actions,
        private invoiceService: LoadInvoiceDataService,
    ) {};
}

/**EFFECTS (current understanding)
 * IMPORTANT: action
 * IMPORTANT: create effects using createEffect()
 * 
 * ACTION: this is what triggers the effects (you pass the action in the typeof () to specify the typeof action you would be triggering the effects on)
 * CREATEEFFECT(): this is what you use to create the effect
 * the create effects takes two parameters
 *  a function with the logic (this function takes in the Action that would trigger the effect)
 *  an object boolean which signifies if the effect would trigger another actions or not (when set to false it does not trigger another action)
 * 
 * this.actions$.pipe(

    )
 * 
 */