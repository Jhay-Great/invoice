import { Component, OnInit } from '@angular/core';
import { IInvoice } from '../../core/interfaces/invoice.interface';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.css'
})
export class InvoiceListComponent implements OnInit {
  invoice: IInvoice[] = [];

  constructor () {};

  ngOnInit ():void {
    // fetch data from service
  }


}
