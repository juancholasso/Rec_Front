import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ScheduleGenerateComponent } from './schedule-generate/schedule-generate.component';
import { ScheduleCalendarComponent } from './schedule-calendar/schedule-calendar.component';


const Routes: Routes = [
  {
    path: 'schedule/generate',
    component: ScheduleGenerateComponent
  },
  {
    path: 'schedule/calendar',
    component: ScheduleCalendarComponent
  }
];
@NgModule({
    imports: [RouterModule.forChild(Routes)],
    exports: [RouterModule]
  })
export class RecycleRoutingModule { }