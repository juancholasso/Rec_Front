import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../../../services/provider.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../../services/template/sweetalert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking

@Component({
    selector: 'app-schedule-calendar',
    templateUrl: './schedule-calendar.component.html',
    styleUrls: ['./schedule-calendar.component.css']
})
export class ScheduleCalendarComponent implements OnInit {

    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth'
    };
    
  constructor(
    private ProviderService:ProviderService,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlertService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) 
  {
    
  }

  ngOnInit(): void {
  }

  

}
