import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuid } from 'uuid'

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private deleteId:string | null = null;
  private deleteSubject = new BehaviorSubject<string | null>(this.deleteId);
  private deleteId$ = this.deleteSubject.asObservable();

  isFormVisible:boolean = false;
  private formVisibilitySubject = new BehaviorSubject<boolean>(false);
  private isFormVisible$ = this.formVisibilitySubject.asObservable();

  // would refractor this and the delete BS
  private invoiceId:string | null = null;
  private invoiceIdSubject = new BehaviorSubject<string | null>(this.deleteId);
  private invoiceId$ = this.invoiceIdSubject.asObservable();

  constructor() { }

  deleteInvoice (id:string | null) {
    console.log('called...')
    this.deleteId = id;
    this.deleteSubject.next(this.deleteId);
  }

  getDeleteItem () {
    return this.deleteId$;
  }

  // TODO: refract this and the deleteInvoice implementation
  setInvoiceId (id:string | null) {
    this.invoiceId = id;
    this.invoiceIdSubject.next(this.invoiceId);
  }

  getInvoiceId () {
    return this.invoiceId$;
  }

  toggleFormVisibility (status:boolean, invoiceId:string | null = null): void {
    this.isFormVisible = status;
    this.formVisibilitySubject.next(this.isFormVisible);
    
    // sets invoice BS
    this.setInvoiceId(invoiceId);
  }

  formVisibility () {
    return this.isFormVisible$;
  }

  generateId ():string {
    const id = uuid();
    return id.slice(0, 6);
  }


}
