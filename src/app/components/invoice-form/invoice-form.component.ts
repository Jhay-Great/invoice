import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel, FormsModule, Form, FormArray } from '@angular/forms';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidV4 } from 'uuid';
import { Store } from '@ngrx/store';
import { AppState } from '../../interfaces/AppState.interface';
import { addInvoice } from '../../state/invoice/actions/loadData.action';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule ],
  templateUrl: './invoice-form.component.html',
  styleUrl: './invoice-form.component.css'
})
export class InvoiceFormComponent implements OnInit{

  form!:FormGroup

  constructor (
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
  ) {
  };
  
  ngOnInit(): void {
    this.form = this.fb.group({
      senderData: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        postCode: ['', Validators.required],
        country: ['', Validators.required],
      }),
      clientData: this.fb.group({
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
    

    const invoiceData = this.form.value;
    const invoice = {
      id,
      ...invoiceData,
    }
    console.log('Dispatching addInvoice with:', invoice);
    console.log(invoice);
    this.store.dispatch(addInvoice({invoice}));
    this.router.navigate([''])

    
  }
}


