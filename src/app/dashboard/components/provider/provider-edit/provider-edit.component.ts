import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../../../services/provider.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../../services/template/sweetalert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';

@Component({
  selector: 'app-provider-edit',
  templateUrl: './provider-edit.component.html',
  styleUrls: ['./provider-edit.component.css']
})
export class ProviderEditComponent implements OnInit {

  public editForm: FormGroup;

  constructor(
    private ProviderService:ProviderService,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlertService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) 
  {
    var id = this.route.snapshot.paramMap.get('id');
    var name = this.route.snapshot.paramMap.get('name');
    var telephone = this.route.snapshot.paramMap.get('telephone');
    var email = this.route.snapshot.paramMap.get('email');
    this.editForm = this.formBuilder.group({
      id: [id,  [Validators.required]],
      name: [name,  [Validators.required, Validators.maxLength(100)]],
      telephone : [telephone, [Validators.required, Validators.maxLength(20)]],
      email : [email, [Validators.required, Validators.maxLength(100), Validators.email]]
    });
    
  }

  ngOnInit(): void {
   
  }

  public async editProvider(form:FormGroup){
    console.log(form.value)
    this.spinner.show();
    this.ProviderService.editProvider(form.value).subscribe(
      (data:any)=>{
        console.log(data)
        this.router.navigate(['provider']);
        this.sweetAlert.showBasicInfoSwal(
          "¡Éxito!",
          "Proveedor actualizado correctamente",
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
          "¡Error al editar el Proveedor!",
          false,
          "btn btn-success",
          "warning"
        );
      }
    )
  }

}
