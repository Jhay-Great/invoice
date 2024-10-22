import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./feature/sidebar/sidebar.component";
import { Store } from '@ngrx/store';
import { AppState } from './core/state/state.interface';
import { loadInvoice } from './core/state/invoice/invoice.actions';
import { DeleteModalComponent } from "./feature/delete-modal/delete-modal.component";
import { Observable } from 'rxjs';
import { ApplicationService } from './core/services/application/application.service';
import { AsyncPipe } from '@angular/common';
import { InvoiceFormComponent } from "./feature/invoice-form/invoice-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, SidebarComponent, DeleteModalComponent, InvoiceFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ngrx-invoice-app';
  isFormVisible:Observable<boolean> = this.appService.formVisibility();
  deleteId:Observable<string | null> = this.appService.getDeleteItem();

  constructor (
    private store: Store<AppState>,
    private appService: ApplicationService,
  ) {};

  ngOnInit(): void {
    this.store.dispatch(loadInvoice())

  }
  
  // ngAfterViewInit(): void {
  //   if (this.deleteModal) {
  //     console.log('works');
  //     console.log('viewing child\'s properties: ', this.deleteModal.id);
  //     if (this.deleteModal.id) {
  //       this.isActive = true;
  //     }

  //   }
  //   this.isActive = false;
  //   console.log('error, can not access component data')
    
  // }
}
