import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/state/state.interface';
import { map, Observable, Subscription, take } from 'rxjs';
import { selectInvoiceById } from '../../core/state/invoice/invoice.selector';
import { IInvoice } from '../../core/interfaces/invoice.interface';
import { AsyncPipe, DatePipe, CurrencyPipe } from '@angular/common';
import { deleteInvoice, markInvoiceAsPaid } from '../../core/state/invoice/invoice.actions';
import { ApplicationService } from '../../core/services/application/application.service';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [RouterLink, AsyncPipe, CurrencyPipe, DatePipe, ],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.css'
})
export class InvoiceDetailComponent implements OnInit {
  invoiceSubscription = Subscription;
  invoiceData$!:Observable<IInvoice[]>
  errorMessage: string | null = null;

  constructor (
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private appService: ApplicationService,
  ) {};

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      take(1),
      map(params => {
        const id = params['id'];
        console.log(id);
        return id;
      })
    ).subscribe(params => {
      this.invoiceData$ = this.store.select(selectInvoiceById(params));
      // console.log(this.invoiceData);
      this.invoiceData$.subscribe(value => console.log(value));
    }
  );
  }

  editInvoice () {
    console.log('under construction');
  }

  deleteInvoice (id:string) {
    this.appService.deleteInvoice(id);

    // console.log(id);
    // this.store.dispatch(deleteInvoice({id}));
    // this.router.navigate(['/']); // routes to home page after deletion;
  }

  markAsPaid (id:string) {
    this.store.dispatch(markInvoiceAsPaid({id}))
  }

}
