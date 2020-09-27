import { Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleService } from '../../../../services/schedule.service';
import { NotificationService } from '../../../../services/notification.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../../services/template/sweetalert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Calendar } from '@fullcalendar/core'; // include this line
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular'; // useful for typechecking
import esLocale from '@fullcalendar/core/locales/es';
declare var $:any;

@Component({
    selector: 'app-gatherer-calendar',
    templateUrl: './gatherer-calendar.component.html',
    styleUrls: ['./gatherer-calendar.component.css']
})
export class GathererCalendarComponent implements OnInit {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  public OPTIONS = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  };

  public schedulesAssigned:any = [];
  public calendarOptions: CalendarOptions = {
      initialView: 'dayGridMonth',
      locale: esLocale,
      eventClick: (event:any)=>{
        var dateStart = new Date(event.event.start);
        var dateStartString = dateStart.toLocaleDateString('es-CO', this.OPTIONS)+"<br>"+dateStart.toLocaleTimeString('es-CO');
        console.log(event)
        this.sweetAlert.showMessageAndButtonCallbackSwal(
          "Cita agendada para recolección",
          dateStartString+"<br>Usuario Cliente: "+event.event.extendedProps.idclient,
          "Validar Recolección",
          (res:Boolean)=>{
            if(!res){
              this.router.navigate(["/gatherer/gather", event.event.extendedProps.schedule]);
            }
          }
        );
      },
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      events: []
  };
    
  constructor(
    private scheduleService:ScheduleService,
    private notificationService: NotificationService,
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
    this.scheduleService.getSchedulesAssigned().subscribe(
      (data:any)=>{
        this.schedulesAssigned = data.map((item)=>{
          return {
            title: (item.startdate).split(" ")[1],
            date: item.startdate,
            idclient: item.iduser_client,
            schedule: item
          }
        });
        this.calendarOptions.events = this.schedulesAssigned;
        this.spinner.hide();
        console.log(data);
      },
      (err:any)=>{
        this.spinner.hide();
      }
    )
  }

  public createNotification(){
    this.sweetAlert.showInputSwal(
      "Crear Notificación",
      '<div class="form-group" style="text-align: left;">' +
      '<label for="examplePass" class="bmd-label-floating">ID Cliente</label>'+
      '<input id="iduser_receptor-swal" required name="iduser_receptor" type="number" class="form-control" />' +
      '</div>'+
      '<div class="form-group" style="text-align: left;">' +
      '<label for="examplePass" class="bmd-label-floating">Asunto</label>'+
      '<input id="title-swal" name="title" required type="text" class="form-control" />' +
      '</div>'+
      '<div class="form-group" style="text-align: left;">' +
      '<label for="examplePass" class="bmd-label-floating">Mensaje</label>'+
      '<textarea id="description-swal" name="description" required class="form-control"></textarea>' +
      '</div>',
      "Enviar",
      "Cancelar",
      (res)=>{
        this.spinner.show();
        var createForm = this.formBuilder.group({
          iduser_receptor: [$('#iduser_receptor-swal').val(),  [Validators.required]],
          title: [$('#title-swal').val(),  [Validators.required,  Validators.maxLength(50)]],
          description: [$('#description-swal').val(),  [Validators.required]],
        });
        if(createForm.valid){
          this.notificationService.createNotification(createForm.value)
          .subscribe(
            (data:any)=>{
              this.sweetAlert.showBasicInfoSwal(
                "¡Éxito!",
                "Notificación creada correctamente<br>Llegará al inbox del cliente",
                false,
                "btn btn-success",
                "success"
              );
              this.spinner.hide();
            },
            (err:any)=>{
              this.sweetAlert.showBasicInfoSwal(
                "UPS, Algo salió mal!",
                "¡Error al crear la Notificación!<br>Intente más tarde",
                false,
                "btn btn-success",
                "warning"
              );
              this.spinner.hide();
            }
          )
        }
        else{
          this.sweetAlert.showBasicInfoSwal(
            "Ups! Algo Salió Mal",
            "¡Por favor complete todos los campos!",
            false,
            "btn btn-success",
            "warning"
          );
          this.spinner.hide();
        }
      } 
    );
  }
}
