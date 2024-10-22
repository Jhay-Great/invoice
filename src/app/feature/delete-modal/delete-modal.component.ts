import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApplicationService } from '../../core/services/application/application.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/state/state.interface';
import { Router } from '@angular/router';
import { deleteInvoice } from '../../core/state/invoice/invoice.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent implements OnInit {
  id!:string;
  subscription!: Subscription;
  @Input({ required: true }) deleteId!:string | null;

  constructor (
    private appService: ApplicationService,
    private store: Store<AppState>,
    private router: Router,
  ) {};

  ngOnInit(): void {
    // handling delete input value
    console.log('input delete value: ', this.deleteId);
  }

  deleteInvoice () {
    console.log(this.deleteId);
    if(this.deleteId) {
      this.store.dispatch(deleteInvoice({id: this.deleteId}));
    }
    this.hideModal();
    this.router.navigate(['/']); // routes to home page after deletion;
  }

  cancelDelete () {
    this.hideModal();
  }
  
  hideModal () {
    this.appService.deleteInvoice(null);
  }
  

}
