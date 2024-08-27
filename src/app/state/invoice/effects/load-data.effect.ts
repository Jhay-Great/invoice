import { Injectable } from "@angular/core";
import { Actions, createEffect } from "@ngrx/effects";

// local module imports
import { loadData } from "../actions/loadData.action";



@Injectable ()
export class LoadDataEffect {

    // loadData$ = createEffect(() => this.actions$.pipe(
    //     typeof(loadData),

    // ), {})
    
    
    constructor (
        private actions$: Actions,
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