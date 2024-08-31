import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  isDeleteModalActive:boolean = false;
  private deleteModalSubject$ = new BehaviorSubject<boolean>(false);
  isModalActive:Observable<boolean> = this.deleteModalSubject$.asObservable();

  private invoiceIdSubject$ = new BehaviorSubject<string>('');
  invoiceId:Observable<string> = this.invoiceIdSubject$.asObservable();
  

  constructor() { 

   }

   setInvoiceId(id:string) {
    this.invoiceIdSubject$.next(id);
   }

   displayModal (state:boolean) {
    this.deleteModalSubject$.next(state);
   }

   displayDeleteModal (id:string) {
    //  this.isDeleteModalActive = true;
    this.displayModal(true);
     this.setInvoiceId(id);
   }

   removeDeleteModal () {
    this.isDeleteModalActive = false;
  }
  

}
