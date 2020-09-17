import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../../../services/provider.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../../services/template/sweetalert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-provider-create',
  templateUrl: './provider-create.component.html',
  styleUrls: ['./provider-create.component.css']
})
export class ProviderCreateComponent implements OnInit {

  public createForm: FormGroup;

  constructor(
    private ProviderService:ProviderService,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlertService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) 
  {
    this.createForm = this.formBuilder.group({
      name: ['',  [Validators.required, Validators.maxLength(100)]],
      telephone : ['', [Validators.required, Validators.maxLength(20)]],
      email : ['', [Validators.required, Validators.maxLength(100), Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  public async createProvider(form:FormGroup){
    this.spinner.show();
    this.ProviderService.createProvider(form.value).subscribe(
      (data:any)=>{
        console.log(data)
        this.router.navigate(['provider']);
        this.sweetAlert.showBasicInfoSwal(
          "¡Éxito!",
          "Proveedor creado correctamente",
          false,
          "btn btn-success",
          "success"
        );
        this.spinner.hide();
      },
      (err:any)=>{
        console.log(err);
        this.spinner.hide();
        this.sweetAlert.showBasicInfoSwal(
          "UPS, Algo salió mal!",
          "¡Error al crear el Proveedor!",
          false,
          "btn btn-success",
          "warning"
        );
      }
    )
  }

}
