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

  cancelDeletion () {
    this.applicationService.removeDeleteModal();
  }

  confirmDeletion () {
    this.applicationService.removeDeleteModal();
  }



}
