import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotificationComponent } from './notification.component';

const Routes: Routes = [
  {
    path: '',
    component: NotificationComponent
  },
];
@NgModule({
    imports: [RouterModule.forChild(Routes)],
    exports: [RouterModule]
  })
export class NotificationRoutingModule { }