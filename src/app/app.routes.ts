import { Routes } from '@angular/router';

// local imports
import { InvoicePageComponent } from './pages/invoice-page/invoice-page.component';
import { InvoiceDetailPageComponent } from './pages/invoice-detail-page/invoice-detail-page.component';

export const routes: Routes = [
    {
        path: '',
        component: InvoicePageComponent,
        title: 'Invoice',
    },
    {
        path: 'invoice/:id',
        component: InvoiceDetailPageComponent,
        title: 'Invoice',
    }
];
