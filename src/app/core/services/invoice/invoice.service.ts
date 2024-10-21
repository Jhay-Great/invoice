import { Injectable } from '@angular/core';
import { IInvoice } from '../../interfaces/invoice.interface';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  api = environment.api;

  constructor(
    private http:HttpClient,
  ) { }

  getData () {
    return this.http.get(this.api);
  }

  createInvoice (invoice:IInvoice) {
    
  }
}
