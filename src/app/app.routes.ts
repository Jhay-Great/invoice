import { Routes } from '@angular/router';

// local imports
import { InvoicePageComponent } from './pages/invoice-page/invoice-page.component';

export const routes: Routes = [
    {
        path: '',
        component: InvoicePageComponent,
        title: 'Invoice',
    }
];
