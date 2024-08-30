import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel, FormsModule, Form, FormArray } from '@angular/forms';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidV4 } from 'uuid';
import { Store } from '@ngrx/store';
import { AppState } from '../../interfaces/AppState.interface';
import { addInvoice } from '../../state/invoice/actions/loadData.action';
import { RouterLink, Router } from '@angular/router';
import { GoBackComponent } from '../go-back/go-back.component';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, GoBackComponent],
  templateUrl: './invoice-form.component.html',
  styleUrl: './invoice-form.component.css'
})
export class InvoiceFormComponent implements OnInit{

  form!:FormGroup
  paymentOptions: Array<{ value: number, label: string }> = [
    { value: 1, label: 'Net 1 Day' },
    { value: 7, label: 'Net 7 Day' },
    { value: 14, label: 'Net 14 Day' },
    { value: 30, label: 'Net 30 Day' },
    ];

  constructor (
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
  ) {
  };
  
  ngOnInit(): void {
    this.form = this.fb.group({
      senderAddress: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        postCode: ['', Validators.required],
        country: ['', Validators.required],
      }),
      clientAddress: this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        street: ['', Validators.required],
        city: ['', Validators.required],
        postCode: ['', Validators.required],
        country: ['', Validators.required],
      }),
      createdAt: ['', Validators.required],
      paymentDue: ['', Validators.required],
      description: ['', Validators.required],
      // status: ['', Validators.required],
      items: this.fb.array([]),
  
    })
    
  }

  get itemsFormArray() {
    return this.form.get('items') as FormArray;
  }

  addItem() {
    const itemForm = this.fb.group({
      name: [''],
      quantity: [0],
      price:[''],
      total:[''],
    });
    this.itemsFormArray.push(itemForm);
  }

  removeItem(index: number) {
    this.itemsFormArray.removeAt(index);
  }

  handleFormSubmission () {
    
    const uuid = uuidV4();
    const id = uuid.slice(0, 6);
    
    const {clientAddress: { name: clientName, email: clientEmail, ...clientAddress }, ...formData} = this.form.value;

    const total = this.calculateTotalSum(formData.items, 'total')
    // console.log(total);

    const invoice = {
      id,
      clientAddress,
      clientName,
      clientEmail,
      ...formData,
      status: 'paid',
      total,
    }
    // console.log('Dispatching addInvoice with:', invoice);
    // console.log(invoice);
    this.store.dispatch(addInvoice({invoice}));
    this.router.navigate([''])

    
  }
  

  calculateTotalSum<T>(data: T[], key: keyof T): number {
    return data.reduce((accumulator, item) => accumulator + (item[key] as unknown as number), 0);
  }
  


  
}


