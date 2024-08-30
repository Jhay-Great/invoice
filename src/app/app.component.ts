import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InvoicePageComponent } from './pages/invoice-page/invoice-page.component';
import { AppBannerComponent } from './components/app-banner/app-banner.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InvoicePageComponent, AppBannerComponent, InvoiceFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngrx-invoice-app';
}
