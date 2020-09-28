import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ExchangeComponent } from './exchange.component';
import { ExchangeConfirmComponent } from './exchange-confirm/exchange-confirm.component';

const Routes: Routes = [
  {
    path: '',
    component: ExchangeComponent
  },
  {
    path: 'confirm',
    component: ExchangeConfirmComponent
  }
];
@NgModule({
    imports: [RouterModule.forChild(Routes)],
    exports: [RouterModule]
  })
export class ExchangeRoutingModule { }