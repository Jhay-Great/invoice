import { Component, Input } from '@angular/core';
import { IInvoice } from '../../core/interfaces/invoice.interface';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-invoice-item',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, ],
  templateUrl: './invoice-item.component.html',
  styleUrl: './invoice-item.component.css'
})
export class InvoiceItemComponent {
  @Input ({required: true}) invoice!:IInvoice;

}
