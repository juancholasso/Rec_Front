import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecolectorRoutingModule } from './recolector.routing';
import { RecolectorComponent } from './recolector.component';
import { RecolectorCreateComponent } from './recolector-create/recolector-create.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecolectorEditComponent } from './recolector-edit/recolector-edit.component';

@NgModule({
  declarations: [
    RecolectorComponent,
    RecolectorCreateComponent,
    RecolectorEditComponent
  ],
  imports: [
    CommonModule,
    RecolectorRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class RecolectorModule { }
