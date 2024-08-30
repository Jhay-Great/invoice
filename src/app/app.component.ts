import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InvoicePageComponent } from './pages/invoice-page/invoice-page.component';
import { AppBannerComponent } from './components/app-banner/app-banner.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { Store } from '@ngrx/store';
import { AppState } from './interfaces/AppState.interface';
import { onLoadDataAction } from './state/invoice/actions/loadData.action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InvoicePageComponent, AppBannerComponent, InvoiceFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ngrx-invoice-app';

  constructor (
    private store: Store<AppState>
  ) {};

  ngOnInit(): void {
    this.store.dispatch(onLoadDataAction())

  }
}
