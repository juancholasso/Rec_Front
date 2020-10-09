import { NgModule,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesRoutingModule } from './invoices.routing';
import { InvoicesComponent } from './invoices.component';
import { InvoicesDetailComponent } from './invoices-detail/invoices-detail.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InvoicesComponent,
    InvoicesDetailComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas :[
  ]
})
export class InvoicesModule { }
