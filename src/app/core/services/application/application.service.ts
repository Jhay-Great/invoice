import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private deleteId:string | null = null;
  private deleteSubject = new BehaviorSubject<string | null>(this.deleteId);
  private deleteId$ = this.deleteSubject.asObservable();

  constructor() { }

  deleteInvoice (id:string | null) {
    console.log('called...')
    this.deleteId = id;
    this.deleteSubject.next(this.deleteId);
  }

  getDeleteItem () {
    return this.deleteId$;
  }


}
