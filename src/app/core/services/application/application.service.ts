import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private deleteId:string | null = null;
  private deleteSubject = new BehaviorSubject<string | null>(this.deleteId);
  private deleteId$ = this.deleteSubject.asObservable();

  private formVisibilitySubject = new BehaviorSubject<boolean>(false);
  private isFormVisible = this.formVisibilitySubject.asObservable();

  constructor() { }

  deleteInvoice (id:string | null) {
    console.log('called...')
    this.deleteId = id;
    this.deleteSubject.next(this.deleteId);
  }

  getDeleteItem () {
    return this.deleteId$;
  }

  toggleFormVisibility (status:boolean): void {
    this.formVisibilitySubject.next(status);
  }

  formVisibility () {
    return this.isFormVisible;
  }


}
