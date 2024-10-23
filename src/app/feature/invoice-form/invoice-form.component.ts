import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApplicationService } from '../../core/services/application/application.service';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { IPaymentDue } from '../../core/interfaces/invoice.interface';

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

    // resets form
    this.reset();
  }

  reset () {
    this.invoiceForm.reset();
  }

  hideForm () {
    this.appService.toggleFormVisibility(false);
    this.reset();
  }

}
