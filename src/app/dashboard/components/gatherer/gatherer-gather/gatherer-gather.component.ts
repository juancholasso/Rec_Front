import { Component, OnInit, ViewChild } from '@angular/core';
import { GathererService } from '../../../../services/gatherer.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../../services/template/sweetalert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-gatherer-gather',
    templateUrl: './gatherer-gather.component.html',
    styleUrls: ['./gatherer-gather.component.css']
})
export class GathererGatherComponent implements OnInit {
    
  public createForm: FormGroup;
  
  constructor(
    private gathererService:GathererService,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlertService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) 
  {
    var iduser_client = this.route.snapshot.paramMap.get('iduser_client');
    var idschedule = this.route.snapshot.paramMap.get('id');

    this.createForm = this.formBuilder.group({
      iduser_client: [iduser_client,  [Validators.required]],
      idschedule: [idschedule,  [Validators.required]],
      description: ['',  [Validators.required]],
      weight: ['',  [Validators.required]],
      state: ['finished',[Validators.required]]
    });
  }

  ngOnInit(): void {
   
  }

  public async createGather(form:FormGroup){
    this.spinner.show();
    this.gathererService.createGatherer(form.value)
    .subscribe(
      (data:any)=>{
        this.sweetAlert.showBasicInfoSwal(
          "¡Registro de Recolección Exitosa",
          "Se ha finalizado la recolección y se le han asignado los puntos al usuario",
          false,
          "btn btn-success",
          "success"
        );
        this.router.navigate(['gatherer/calendar'])
        this.spinner.hide();
      },
      (err:any)=>{
        console.log(err)
        this.sweetAlert.showBasicInfoSwal(
          "UPS, Algo salió mal!",
          "¡Intente más tarde!",
          false,
          "btn btn-success",
          "warning"
        );
        this.spinner.hide();
      }
    )
  }

}
