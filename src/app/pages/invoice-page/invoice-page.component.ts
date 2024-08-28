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
  isEmpty:boolean = true;
  data = this.store.select(selectLoadInvoice);
  state = this.store.select(selectLoadState);
  
  constructor (
    private store: Store<AppState>,
  ) {
    // const data = this.store.select(selectLoadInvoice);
    // console.log(data);
  }
  
  ngOnInit(): void {
    this.store.dispatch(onLoadDataAction())
    // this.store.dispatch(filterInvoice({filterCriteria: 'paid'}))
    // this.store.dispatch(filterInvoiceByDraft({ filterCriteria: 'draft'}));

    // this.store.select(selectFilterFeature)
    
  }

  filterInvoiceData (event:MouseEvent) {
    return;
    const target = event.target as HTMLInputElement;
    const { name } = target;
    // console.log(name);

    const selectedName = 

    this.store.dispatch(filterInvoice({ filterCriteria: name}));

  }

  // usingTemplateRef (event: any) {
  //   console.log('from tempRef: ', event);
  // }

  filterByDraft (HTMLElement: HTMLElement) {
    const target = HTMLElement as HTMLInputElement
    const name = target.name;
    
    if (target.checked) {
        this.store.dispatch(filterInvoice({ filterCriteria: name}));
    } else {
      this.store.dispatch(filterInvoice({filterCriteria: ''}))
    }
    

  }
  filterByPaid (HTMLElement: HTMLElement) {
    const target = HTMLElement as HTMLInputElement
    const name = target.name;
    
    if (target.checked) {
        this.store.dispatch(filterInvoice({ filterCriteria: name}));
    } else {
      this.store.dispatch(filterInvoice({filterCriteria: ''}))
    }
    

  }
  filterByPending (HTMLElement: HTMLElement) {
    const target = HTMLElement as HTMLInputElement
    const name = target.name;
    
    if (target.checked) {
        this.store.dispatch(filterInvoice({ filterCriteria: name}));
    } else {
      this.store.dispatch(filterInvoice({filterCriteria: ''}))
    }
    

  }
  
}
