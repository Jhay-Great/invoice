import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApplicationService } from '../../core/services/application/application.service';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [ ReactiveFormsModule, ],
  templateUrl: './invoice-form.component.html',
  styleUrl: './invoice-form.component.css'
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm!:FormGroup;

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
    this.appService.toggleFormVisibility(false);
    console.log('clicked...')
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

}
