import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLoadInvoice } from '../../state/invoice/selectors/loadData.selector';
import { onLoadDataAction } from '../../state/invoice/actions/loadData.action';
import { AppState } from '../../interfaces/AppState.interface';

@Component({
  selector: 'app-invoice-page',
  standalone: true,
  imports: [],
  templateUrl: './invoice-page.component.html',
  styleUrl: './invoice-page.component.css'
})
export class InvoicePageComponent {
  isEmpty:boolean = true;

  constructor (
    private store: Store<AppState>,
  ) {
    // this.store.dispatch(onLoadDataAction)
    // this.store.select(selectLoadInvoice)
  }
  
}
