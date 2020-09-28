import { Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleService } from '../../../../services/schedule.service';
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
    private scheduleService:ScheduleService,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlertService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) 
  {
    var iduser_client = this.route.snapshot.paramMap.get('iduser_client');
    var iduser_recolector = this.route.snapshot.paramMap.get('iduser_recolector');

    this.createForm = this.formBuilder.group({
      iduser_client: [iduser_client,  [Validators.required]],
      iduser_recolector: [iduser_recolector,  [Validators.required]],
      description: ['',  [Validators.required]],
      weight: ['',  [Validators.required]],
      state: ['finalizada',[Validators.required]]
    });
  }

  ngOnInit(): void {
   
  }

  public async createGather(form:FormGroup){
  }

}
