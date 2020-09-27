import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { GathererCalendarComponent } from './gatherer-calendar/gatherer-calendar.component';
import { GathererGatherComponent } from './gatherer-gather/gatherer-gather.component';

const Routes: Routes = [
  {
    path: 'calendar',
    component: GathererCalendarComponent
  },
  {
    path: 'gather',
    component: GathererGatherComponent
  }
];
@NgModule({
    imports: [RouterModule.forChild(Routes)],
    exports: [RouterModule]
  })
export class GathererRoutingModule { }