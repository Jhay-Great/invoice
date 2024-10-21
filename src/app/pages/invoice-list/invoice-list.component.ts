import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.css'
})
export class InvoiceListComponent implements OnInit {
  invoice: any[] = [];

  constructor () {};

  ngOnInit ():void {
    // fetch data from service
  }


}
