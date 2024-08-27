import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadData, loadDataAction, loadDataSuccess } from '../../state/invoice/actions/loadData.action';
import { loadInvoice, selectLoadInvoice } from '../../state/invoice/selectors/loadData.selector';
import { LoadingState } from '../../state/invoice/reducers/loadData.reducer';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-page',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './invoice-page.component.html',
  styleUrl: './invoice-page.component.css'
})
export class InvoicePageComponent {
  isEmpty:boolean = true;
  // data = this.store.select(selectLoadInvoice)
  // data = this.store.select(loadInvoice)
  data!: Observable<any>

  constructor (
    private store: Store<LoadingState>,
  ) {
    this.store.dispatch(loadDataAction());
    // const data = this.store.select(loadInvoice);
    this.data.subscribe(val => console.log(val))

    this.data = this.store.select(loadInvoice);
    // console.log('hello')
  }
}
