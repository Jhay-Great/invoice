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
    this.isFormVisible = status;
    this.formVisibilitySubject.next(this.isFormVisible);
    console.log(this.isFormVisible)

  }

  formVisibility () {
    return this.isFormVisible$;
  }

  generateId ():string {
    const id = uuid();
    return id.slice(0, 6);
  }


}
