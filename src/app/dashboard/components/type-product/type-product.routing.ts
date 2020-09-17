import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TypeProductComponent } from './type-product.component';
import { TypeProductCreateComponent } from './type-product-create/type-product-create.component';
import { TypeProductEditComponent } from './type-product-edit/type-product-edit.component';

const Routes: Routes = [
  {
    path: '',
    component: TypeProductComponent
  },
  {
    path: 'create',
    component: TypeProductCreateComponent
  },
  {
    path: 'edit',
    component: TypeProductEditComponent
  }
];
@NgModule({
    imports: [RouterModule.forChild(Routes)],
    exports: [RouterModule]
  })
export class TypeProductRoutingModule { }