import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./feature/sidebar/sidebar.component";
import { Store } from '@ngrx/store';
import { AppState } from './core/state/state.interface';
import { loadInvoice } from './core/state/invoice/invoice.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'ngrx-invoice-app';

  constructor (
    private store: Store<AppState>
  ) {};

  ngOnInit(): void {
    this.store.dispatch(loadInvoice())
  }
}
