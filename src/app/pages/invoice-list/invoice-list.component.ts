import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

// local imports
import { AppState } from '../../core/state/state.interface';
import { selectAllInvoice } from '../../core/state/invoice/invoice.selector';
import { IInvoice, IFilter } from '../../core/interfaces/invoice.interface';
import { InvoiceItemComponent } from "../../feature/invoice-item/invoice-item.component";
import { filterAction } from '../../core/state/invoice/invoice.actions';
import { ApplicationService } from '../../core/services/application/application.service';


type filterOptions = { name: string, checked: boolean };


@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [AsyncPipe, RouterLink, InvoiceItemComponent],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.css'
})
export class InvoiceListComponent implements OnInit {
  invoice$!: Observable<IInvoice[]>;
  dropdownIsActive:boolean = false;
  filterOptions:IFilter = {draft: false, pending: false, paid: false};

  constructor (
    private store: Store<AppState>,
    private appService: ApplicationService,
  ) {};

  ngOnInit ():void {
    // select invoice slice from store
    this.invoice$ = this.store.select(selectAllInvoice);
  }

  // display new form
  invoiceForm () {
    this.appService.toggleFormVisibility(true);
  }

  // filter functionalities
  // filter options
  handleFilterOptions (event:MouseEvent) {
    // checks if event occurred on the input/checkbox
    if (!(event.target instanceof HTMLInputElement)) {
      return;
    }
    
    const target = event.target as HTMLInputElement;
    const { name, checked } = target;

    // updates the object with the current values
    this.filterOptions = {...this.filterOptions, [name]: checked}
    this.store.dispatch(filterAction({filter: this.filterOptions}))
    
  }

  // toggle filter menu
  toggleFilterDropdown () {
    this.dropdownIsActive = !this.dropdownIsActive;
  }


}
