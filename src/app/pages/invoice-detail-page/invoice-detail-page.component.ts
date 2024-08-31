import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../interfaces/AppState.interface';
import { selectInvoice } from '../../state/invoice/selectors/loadData.selector';
import { Observable, tap } from 'rxjs';
// import { InvoiceState } from '../../state/invoice/reducers/loadData.reducer';
import { CommonModule } from '@angular/common';
import { GoBackComponent } from '../../components/go-back/go-back.component';
import { confirmDelete, deleteInvoice } from '../../state/invoice/actions/loadData.action';
import { ApplicationService } from '../../services/application.service';


@Component({
  selector: 'app-invoice-detail-page',
  standalone: true,
  imports: [ CommonModule, RouterLink, GoBackComponent, ],
  templateUrl: './invoice-detail-page.component.html',
  styleUrl: './invoice-detail-page.component.css'
})
export class InvoiceDetailPageComponent implements OnInit {

  // data$!:Observable<string>
  data$ = this.store.select(selectInvoice);

  constructor (
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private applicationService: ApplicationService,
  ) {};

  ngOnInit(): void {
    // console.log(this.store.select(selectInvoice));
    // console.log(this.data$);
    // this.store.select(selectInvoice).subscribe(val => console.log(val))
  }

  edit () {
    this.data$.subscribe(val => console.log(val))
    console.log('..edit');
  }
  delete (id:string) {
    this.applicationService.displayDeleteModal(id);
    // this.store.dispatch(confirmDelete({id}));
    // this.store.dispatch(deleteInvoice({id}));
  }
  markAsPaid () {
    console.log('..marking as paid')
  }
  
}
