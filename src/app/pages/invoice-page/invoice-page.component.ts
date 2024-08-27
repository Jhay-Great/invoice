import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice-page',
  standalone: true,
  imports: [],
  templateUrl: './invoice-page.component.html',
  styleUrl: './invoice-page.component.css'
})
export class InvoicePageComponent {
  isEmpty:boolean = true;
}
