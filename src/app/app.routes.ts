import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/invoice-list/invoice-list.component').then(il => il.InvoiceListComponent),
        title: 'Invoices'
    },
    {
        path: '/:id',
        loadComponent: () => import('./pages/invoice-detail/invoice-detail.component').then(d => d.InvoiceDetailComponent),
        title: 'Invoice',
    }
];
