import { Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleService } from '../../../../services/schedule.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../../services/template/sweetalert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Calendar } from '@fullcalendar/core'; // include this line
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular'; // useful for typechecking
import esLocale from '@fullcalendar/core/locales/es';

@Component({
    selector: 'app-schedule-calendar',
    templateUrl: './schedule-calendar.component.html',
    styleUrls: ['./schedule-calendar.component.css']
})
export class ScheduleCalendarComponent implements OnInit {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  public schedules:any = [];
  public calendarOptions: CalendarOptions = {
      initialView: 'dayGridMonth',
      locale: esLocale,
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      events: []
  };
    
  constructor(
    private scheduleService:ScheduleService,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlertService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) 
  {
    const name = Calendar.name;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.scheduleService.getSchedulesCreated().subscribe(
      (data:any)=>{
        this.schedules = data.map((item)=>{
          return {
            title: "Recolección",
            date: item.startdate
          }
        });
        this.calendarOptions.events =  this.schedules;
        this.spinner.hide();
        console.log(this.schedules);
      },
      (err:any)=>{
        this.spinner.hide();
      }
    )
  }

  

}
