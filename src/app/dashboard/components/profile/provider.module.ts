import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderRoutingModule } from './provider.routing';
import { ProviderComponent } from './provider.component';
import { ProviderCreateComponent } from './provider-create/provider-create.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProviderEditComponent } from './provider-edit/provider-edit.component';

@NgModule({
  declarations: [
    ProviderComponent,
    ProviderCreateComponent,
    ProviderEditComponent
  ],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProviderModule { }
