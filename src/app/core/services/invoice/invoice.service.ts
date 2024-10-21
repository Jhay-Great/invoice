import { Injectable } from '@angular/core';
import { IInvoice } from '../../interfaces/invoice.interface';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  invoice: IInvoice[] = [];
  api = environment.api;

  constructor(
    private http:HttpClient,
  ) { }

  getData ():Observable<IInvoice[]> {
    return this.http.get<IInvoice[]>(this.api);
  }

  createInvoice (invoice:IInvoice) {
    
  }
}
