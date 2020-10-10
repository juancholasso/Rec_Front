import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecolectorComponent } from './recolector.component';
import { RecolectorCreateComponent } from './recolector-create/recolector-create.component';
import { RecolectorEditComponent } from './recolector-edit/recolector-edit.component';

const Routes: Routes = [
  {
    path: '',
    component: RecolectorComponent
  },
  {
    path: 'create',
    component: RecolectorCreateComponent
  },
  {
    path: 'edit',
    component: RecolectorEditComponent
  }
];
@NgModule({
    imports: [RouterModule.forChild(Routes)],
    exports: [RouterModule]
  })
export class RecolectorRoutingModule { }