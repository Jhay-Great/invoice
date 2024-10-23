import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApplicationService } from '../../core/services/application/application.service';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { IPaymentDue } from '../../core/interfaces/invoice.interface';
import { createInvoice } from '../../core/state/invoice/invoice.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/state/state.interface';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [ ReactiveFormsModule, DropdownModule, CalendarModule],
  templateUrl: './invoice-form.component.html',
  styleUrl: './invoice-form.component.css'
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm!:FormGroup;
  paymentDueOptions:IPaymentDue[] = [
    {name: 'Net 1 Day', value: '1'},
    {name: 'Net 7 Days', value: '7'},
    {name: 'Net 14 Days', value: '14'},
    {name: 'Net 30 Days', value: '30'},
  ]

  constructor (
    private fb:FormBuilder,
    private appService: ApplicationService,
    private store: Store<AppState>,
  ) {};

  ngOnInit(): void {
    // builds form
    this.invoiceForm = this.fb.group({
      senderAddress: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        postCode: ['', Validators.required],
        country: ['', Validators.required],
      }),
      clientAddress: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        postCode: ['', Validators.required],
        country: ['', Validators.required],
        clientName: ['', Validators.required],
        clientEmail: ['', [Validators.required, Validators.email]],
      }),
      createdAt: ['', Validators.required],
      paymentDue: ['', Validators.required],
      description: ['', Validators.required],
      items: this.fb.array([]),
    })
  }

  discard () {
    this.hideForm();
    // this.appService.toggleFormVisibility(false);
  }

  saveAsDraft () {
    const formValue = this.invoiceForm.value;
    console.log(formValue);

    
    // handle valid data and dispatch action
    const { 
      clientAddress: {clientEmail, clientName, street, city, postCode, country },
       senderAddress,
       createdAt,
      } = formValue;

    const data = {
      id: this.appService.generateId(),
      senderAddress,
      clientEmail,
      clientName,
      createdAt: this.formatDate(createdAt),
      clientAddress: {street, city, postCode, country},
      status: 'draft',
      ...formValue,
    }
    console.log(data);
    this.store.dispatch(createInvoice({invoiceData: data}))

    // hides and resets form
    this.hideForm();
  }


  get items () {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItems ():void {
    const itemData = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      total: ['', Validators.required],
    });

    this.items.push(itemData);
  }

  removeItem (index:number):void {
    this.items.removeAt(index);
  }

  onSubmit () {
    // handle invalidity
    const formData = this.invoiceForm;
    if (formData.invalid) {
      console.log(formData.value);
      return;
    }

    // handle valid data and dispatch action
    const { 
      clientAddress: {clientEmail, clientName, street, city, postCode, country },
       senderAddress,
       createdAt,
      } = formData.value;

    const data = {
      id: this.appService.generateId(),
      senderAddress,
      clientEmail,
      clientName,
      createdAt: this.formatDate(createdAt),
      clientAddress: {street, city, postCode, country},
      status: 'paid',
      ...formData.value,
    }
    console.log(data);
    this.store.dispatch(createInvoice({invoiceData: data}))

    // resets and hides form
    this.hideForm();
  }

  reset () {
    this.invoiceForm.reset();
  }

  hideForm () {
    this.appService.toggleFormVisibility(false);
    this.reset();
  }

  formatDate (dateString:string) {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString().padStart(2, '0');

    const formattedDate = `${day}/${month}/${year}`;
    
    return formattedDate;
  }

}
