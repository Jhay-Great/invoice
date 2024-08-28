import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';

// local module imports
import { selectLoadInvoice, selectLoadState } from '../../state/invoice/selectors/loadData.selector';
import { onLoadDataAction } from '../../state/invoice/actions/loadData.action';
import { AppState } from '../../interfaces/AppState.interface';
import { filterInvoice, filterInvoiceByDraft } from '../../state/invoice/actions/filterInvoice.action';
import { selectFilterFeature } from '../../state/invoice/selectors/filterInvoice.selector';

@Component({
  selector: 'app-invoice-page',
  standalone: true,
  imports: [ AsyncPipe,],
  templateUrl: './invoice-page.component.html',
  styleUrl: './invoice-page.component.css'
})
export class InvoicePageComponent implements OnInit {
  isEmpty:boolean = false;
  data = this.store.select(selectLoadInvoice);
  state = this.store.select(selectLoadState);
  filterOptions = {paid: false, pending: false, draft: false};

  
  constructor (
    private store: Store<AppState>,
  ) {
    // const data = this.store.select(selectLoadInvoice);
    // console.log(data);
  }
  
  ngOnInit(): void {
    this.store.dispatch(onLoadDataAction())
    
    
  }

  displayDropDownMenu () {
    console.log('click')
    this.isEmpty = !this.isEmpty;
  }

  filterInvoiceData (event:MouseEvent) {
    // return;
    const target = event.target as HTMLInputElement;
    const { name } = target;
    const isChecked = target.checked;

    this.filterOptions = {
      ...this.filterOptions,
      [name]: isChecked,
    };

    this.store.dispatch(filterInvoice({ filterCriteria: this.filterOptions}));

  }
  
}
