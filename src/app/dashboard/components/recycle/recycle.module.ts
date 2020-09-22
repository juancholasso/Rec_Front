import { NgModule,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleGenerateComponent } from './schedule-generate/schedule-generate.component';
import { ScheduleCalendarComponent } from './schedule-calendar/schedule-calendar.component';
import { RecycleRoutingModule } from './recycle.routing';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule,} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import timegridP from '@fullcalendar/resource-timegrid';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  resourceTimeGridPlugin,
  dayGridPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [
    ScheduleGenerateComponent,
    ScheduleCalendarComponent
  ],
  imports: [
    CommonModule,
    RecycleRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    FullCalendarModule
  ],
  schemas :[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class RecycleModule { }
