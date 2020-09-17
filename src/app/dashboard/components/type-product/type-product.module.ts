import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeProductRoutingModule } from './type-product.routing';
import { TypeProductComponent } from './type-product.component';
import { TypeProductCreateComponent } from './type-product-create/type-product-create.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypeProductEditComponent } from './type-product-edit/type-product-edit.component';

@NgModule({
  declarations: [
    TypeProductComponent,
    TypeProductCreateComponent,
    TypeProductEditComponent
  ],
  imports: [
    CommonModule,
    TypeProductRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TypeProductModule { }
