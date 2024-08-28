import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';

// local module imports
import { selectLoadInvoice, selectLoadState } from '../../state/invoice/selectors/loadData.selector';
import { onLoadDataAction } from '../../state/invoice/actions/loadData.action';
import { AppState } from '../../interfaces/AppState.interface';

@Component({
  selector: 'app-invoice-page',
  standalone: true,
  imports: [ AsyncPipe,],
  templateUrl: './invoice-page.component.html',
  styleUrl: './invoice-page.component.css'
})
export class InvoicePageComponent implements OnInit {
  isEmpty:boolean = true;
  data = this.store.select(selectLoadInvoice);
  state = this.store.select(selectLoadState)

  constructor (
    private store: Store<AppState>,
  ) {
    // const data = this.store.select(selectLoadInvoice);
    // console.log(data);
  }
  
  ngOnInit(): void {
    this.store.dispatch(onLoadDataAction())
    
  }

  filterInvoice () {

  }
  
}
