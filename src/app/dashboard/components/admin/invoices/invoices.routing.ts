import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { InvoicesComponent } from './invoices.component';
import { InvoicesDetailComponent } from './invoices-detail/invoices-detail.component';

const Routes: Routes = [
  {
    path: '',
    component: InvoicesComponent
  },
  {
    path: 'detail',
    component: InvoicesDetailComponent
  },
];
@NgModule({
    imports: [RouterModule.forChild(Routes)],
    exports: [RouterModule]
  })
export class InvoicesRoutingModule { }