import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  isDeleteModalActive:boolean = false;

  private invoiceIdSubject$ = new BehaviorSubject<string>('');
  invoiceId:Observable<string> = this.invoiceIdSubject$.asObservable();
  

  constructor() { 

   }

   setInvoiceId(id:string) {
    this.invoiceIdSubject$.next(id);
   }

   displayDeleteModal (id:string) {
    this.isDeleteModalActive = true;
    this.setInvoiceId(id);
   }
}
