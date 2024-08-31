import { Component, Input } from '@angular/core';
import { ApplicationService } from '../../services/application.service';

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
  ) {};

  cancelDelete () {
    this.applicationService.removeDeleteModal();
  }

  confirmDelete () {
    this.applicationService.removeDeleteModal();
  }



}
