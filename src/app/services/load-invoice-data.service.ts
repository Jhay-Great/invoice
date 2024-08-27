import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// local imports
import { LoadData } from '../interfaces/loadData.interface';

@Injectable({
  providedIn: 'root'
})
export class LoadInvoiceDataService {

  dataUrl = '../../assets/data.json';

  constructor(
    private HttpClient: HttpClient,
  ) { }

  fetchInvoiceData () {
    return this.HttpClient.get<LoadData>(`${this.dataUrl}`);
  }
}
