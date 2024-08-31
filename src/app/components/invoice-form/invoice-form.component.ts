import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { NgForm, NgModel, FormsModule, Form, FormArray } from '@angular/forms';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidV4 } from 'uuid';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';

// local module imports
import { AppState } from '../../interfaces/AppState.interface';
import { addInvoice } from '../../state/invoice/actions/loadData.action';
import { GoBackComponent } from '../go-back/go-back.component';
import { map, Observable, tap } from 'rxjs';
import { selectInvoice } from '../../state/invoice/selectors/loadData.selector';
import { InvoiceState } from '../../state/invoice/reducers/loadData.reducer';
import { LoadDataInterface } from '../../interfaces/loadData.interface';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AsyncPipe, GoBackComponent],
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
    isNewForm!:boolean;
    invoiceData$!: Observable<LoadDataInterface | undefined>;

  constructor (
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
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
      paymentTerms: ['', Validators.required],
      description: ['', Validators.required],
      // status: ['', Validators.required],
      items: this.fb.array([]),
  
    })

    this.isNewForm = true;
    // this.activatedRoute.paramMap.subscribe(val => console.log(val));

    // this.activatedRoute.paramMap.subscribe(
    //   val => {
    //     const d = val.get('form');
    //     console.log(d);
    //   }
    // )

    // this.activatedRoute.params.subscribe(params => {
    //   // Access the route parameters directly from the params object
    //   const id = params;
    //   console.log('Route parameter id:', id);
    // });

        // Access route path segments
        const routeSnapshot = this.activatedRoute.snapshot;
        const routePath = routeSnapshot.url.map(segment => segment.path).join('/');
        
        if (routePath === 'new-form') {
          this.isNewForm = true;
        } else {
          this.isNewForm = false;
          this.invoiceData$ = this.store.select(selectInvoice);

          this.invoiceData$.pipe(
            map(val => {
              console.log(val);
              // const { }
            })
          )
          
          this.invoiceData$.subscribe(
            data =>{
              console.log(data);
              // this.form.patchValue(data);
            },
          )
          
          this.form.patchValue(this.invoiceData$);
          // console.log(this.invoiceData$);
        }

        // this.isNewForm = routePath === 'new-form' ? true : false;
    
    
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


