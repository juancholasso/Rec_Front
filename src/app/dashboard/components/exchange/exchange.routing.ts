import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ExchangeComponent } from './exchange.component';
import { ExchangeConfirmComponent } from './exchange-confirm/exchange-confirm.component';
import { ExchangeSuccessComponent } from './exchange-success/exchange-success.component';
import { ExchangeInvoicesComponent } from './exchange-invoices/exchange-invoices.component';

const Routes: Routes = [
  {
    path: '',
    component: ExchangeComponent
  },
  {
    path: 'confirm',
    component: ExchangeConfirmComponent
  },
  {
    path: 'success',
    component: ExchangeSuccessComponent
  },
  {
    path: 'invoices',
    component: ExchangeInvoicesComponent
  }
];
@NgModule({
    imports: [RouterModule.forChild(Routes)],
    exports: [RouterModule]
  })
export class ExchangeRoutingModule { }