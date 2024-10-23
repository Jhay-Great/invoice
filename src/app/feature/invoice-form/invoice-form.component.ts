import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApplicationService } from '../../core/services/application/application.service';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { IInvoice, IPaymentDue } from '../../core/interfaces/invoice.interface';
import { createInvoice, updateInvoice } from '../../core/state/invoice/invoice.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/state/state.interface';
import { ActivatedRoute } from '@angular/router';
import { map, take, tap } from 'rxjs';
import { selectInvoiceById } from '../../core/state/invoice/invoice.selector';

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
    {name: 'Net 1 Day', value: 1},
    {name: 'Net 7 Days', value: 7},
    {name: 'Net 14 Days', value: 14},
    {name: 'Net 30 Days', value: 30},
  ]
  invoiceId:string | null = null;

  constructor (
    private fb:FormBuilder,
    private appService: ApplicationService,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
  ) {};

  ngOnInit(): void {
    // getting id from url
    // this.calcPaymentDueDate('23-03-21')

    this.appService.getInvoiceId().pipe(
      take(1),
    ).subscribe(invoiceId => this.invoiceId = invoiceId);

    if (this.invoiceId) {
      this.store.select(selectInvoiceById(this.invoiceId)).subscribe(
        value => {
          this.populateForm(value)
        }
      )
    } else {
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


    
  }

  populateForm ([data]:IInvoice[]) {
        this.invoiceForm = this.fb.group({
      senderAddress: this.fb.group({
        street: [data.senderAddress.street, Validators.required],
        city: [data.senderAddress.city, Validators.required],
        postCode: [data.senderAddress.postCode, Validators.required],
        country: [data.senderAddress.country, Validators.required],
      }),
      clientAddress: this.fb.group({
        street: [data.clientAddress.street, Validators.required],
        city: [data.clientAddress.city, Validators.required],
        postCode: [data.clientAddress.postCode, Validators.required],
        country: [data.clientAddress.country, Validators.required],
        clientName: [data.clientName, Validators.required],
        clientEmail: [data.clientEmail, [Validators.required, Validators.email]],
      }),
      createdAt: [data.createdAt, Validators.required],
      paymentDue: [data.paymentDue, Validators.required],
      description: [data.description, Validators.required],
      items: this.fb.array([]),
    })
    //     this.invoiceForm.patchValue({
    //   senderAddress: {
    //     street: data.senderAddress.street,
    //     city: data.senderAddress.city,
    //     postCode: data.senderAddress.postCode,
    //     country: data.senderAddress.country,
    //   },
    //   clientAddress: {
    //     street: data.clientAddress.street,
    //     city: data.clientAddress.city,
    //     postCode: data.clientAddress.postCode,
    //     country: data.clientAddress.country,
    //     clientName:data.clientName,
    //     clientEmail:data.clientEmail, 
    //   },
    //   createdAt: data.createdAt,
    //   paymentDue: data.paymentDue,
    //   description: data.description,
    //   // items: this.fb.array([]),
    // })
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

  saveChanges () {
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
       paymentDue,
       createdAt,
      } = formData.value;

    const data = {
      ...formData.value,
      id: this.invoiceId,
      senderAddress,
      clientEmail,
      clientName,
      paymentDue: this.calcPaymentDueDate(createdAt, paymentDue),
      createdAt: this.formatDate(createdAt),
      clientAddress: {street, city, postCode, country},
      status: 'pending',
    }
    console.log('update: ', data);
    this.store.dispatch(updateInvoice({invoiceData: data}))

    // resets and hides form
    this.hideForm();
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
       paymentDue,
       createdAt,
      } = formData.value;

    const data = {
      ...formData.value,
      id: this.appService.generateId(),
      senderAddress,
      clientEmail,
      clientName,
      clientAddress: {street, city, postCode, country},
      status: 'pending',
      createdAt: this.formatDate(createdAt),
      paymentDue: this.calcPaymentDueDate(createdAt, paymentDue.value),
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

    const formattedDate = `${year}-${month}-${day}`;
    
    return formattedDate;
  }

  calcPaymentDueDate (dateString:string, dueIn:number) {
    console.log(dateString, dueIn);
    const date = new Date(dateString);
    const day = date.getDate();

    // console.log(date, day);
    
    const currentDate = date.setDate(day + dueIn);
    // console.log('current date: ', currentDate);
    console.log('logging new date: ', date.toString());
    const formattedDate = this.formatDate(date.toString());
    // return date;  
    console.log(formattedDate);
    return formattedDate;  

  }

}
