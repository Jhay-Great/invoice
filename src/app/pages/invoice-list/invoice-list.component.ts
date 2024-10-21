import { Component, OnInit } from '@angular/core';
import { IInvoice } from '../../core/interfaces/invoice.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/state/state.interface';
import { selectAllInvoice } from '../../core/state/invoice/invoice.selector';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { InvoiceItemComponent } from "../../feature/invoice-item/invoice-item.component";

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [AsyncPipe, InvoiceItemComponent],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.css'
})
export class InvoiceListComponent implements OnInit {
  invoice$!: Observable<IInvoice[]>;

  constructor (
    private store: Store<AppState>
  ) {};

  ngOnInit ():void {
    // select invoice slice from store
    this.invoice$ = this.store.select(selectAllInvoice);
  }


}
