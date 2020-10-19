import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProviderComponent } from './provider.component';
import { ProviderCreateComponent } from './provider-create/provider-create.component';
import { ProviderEditComponent } from './provider-edit/provider-edit.component';

const Routes: Routes = [
  {
    path: '',
    component: ProviderComponent
  },
  {
    path: 'create',
    component: ProviderCreateComponent
  },
  {
    path: 'edit',
    component: ProviderEditComponent
  }
];
@NgModule({
    imports: [RouterModule.forChild(Routes)],
    exports: [RouterModule]
  })
export class ProviderRoutingModule { }