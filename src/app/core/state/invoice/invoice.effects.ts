import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { loadInvoice, loadInvoiceSuccess } from "./invoice.actions";
import { map, switchMap } from "rxjs";
import { InvoiceService } from "../../services/invoice/invoice.service";

@Injectable()
export class InvoiceEffect {

    loadInvoice$ = createEffect(() => 
        this.actions.pipe(
            ofType(loadInvoice),
            switchMap(() => 
                // implement local storage later
                this.invoiceService.getData().pipe(
                    map(data => loadInvoiceSuccess({ invoice: data}))
                )
            )
        )
    )

    constructor (
        private actions: Actions,
        private invoiceService: InvoiceService,
    ) {};
}