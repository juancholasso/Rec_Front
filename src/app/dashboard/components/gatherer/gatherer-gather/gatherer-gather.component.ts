import { Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleService } from '../../../../services/schedule.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../../services/template/sweetalert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  ) 
  {
    this.createForm = this.formBuilder.group({
      idproducttype: ['',  [Validators.required]],
      idprovider: ['',  [Validators.required]],
      name: ['',  [Validators.required, Validators.maxLength(100)]],
      points: ['',  [Validators.required, Validators.max(1000)]],
      description: ['',  [Validators.required]],
      state : ['', [Validators.required]],
      quantity : ['', [Validators.required, Validators.max(1000)]]
    });
  }

  ngOnInit(): void {
   
  }

  public async createProduct(form:FormGroup){
  }

}
