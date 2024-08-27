import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// local imports

@Injectable({
  providedIn: 'root'
})
export class LoadInvoiceDataService {

  dataUrl = '../../assets/data.json';

  constructor(
    private HttpClient: HttpClient,
  ) { }

  fetchInvoiceData () {
    
  }
}
