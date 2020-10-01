import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeRoutingModule } from './exchange.routing';
import { ExchangeComponent } from './exchange.component';
import { ExchangeSuccessComponent } from './exchange-success/exchange-success.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExchangeConfirmComponent } from './exchange-confirm/exchange-confirm.component';
import { ExchangeInvoicesComponent } from './exchange-invoices/exchange-invoices.component';

@NgModule({
  declarations: [
    ExchangeComponent,
    ExchangeConfirmComponent,
    ExchangeSuccessComponent,
    ExchangeInvoicesComponent
  ],
  imports: [
    CommonModule,
    ExchangeRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ExchangeModule { }
