import { Component, Input } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../interfaces/AppState.interface';
import { deleteInvoice } from '../../state/invoice/actions/loadData.action';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent {

  invoiceId!:string;

  constructor (
    private applicationService: ApplicationService,
    private store: Store<AppState>
  ) {};

  cancelDeletion () {
    this.applicationService.removeDeleteModal();
  }
  
  confirmDeletion () {
    this.applicationService.removeDeleteModal();
    const id = this.applicationService.id;
    
    this.store.dispatch(deleteInvoice({id}))
  }



}
