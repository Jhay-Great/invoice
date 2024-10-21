import { Component, Input } from '@angular/core';
import { IInvoice } from '../../core/interfaces/invoice.interface';

@Component({
  selector: 'app-invoice-item',
  standalone: true,
  imports: [],
  templateUrl: './invoice-item.component.html',
  styleUrl: './invoice-item.component.css'
})
export class InvoiceItemComponent {
  @Input ({required: true}) invoice!:IInvoice;

}
