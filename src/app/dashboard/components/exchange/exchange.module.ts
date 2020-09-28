import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeRoutingModule } from './exchange.routing';
import { ExchangeComponent } from './exchange.component';
// import { ProductCreateComponent } from './product-create/product-create.component';
// import { ProductImageComponent } from './product-image/product-image.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExchangeConfirmComponent } from './exchange-confirm/exchange-confirm.component';

@NgModule({
  declarations: [
    ExchangeComponent,
    ExchangeConfirmComponent
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
