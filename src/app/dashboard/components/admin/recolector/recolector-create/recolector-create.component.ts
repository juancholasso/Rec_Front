import { Component, OnInit } from '@angular/core';
import { RecolectorService } from '../../../../../services/recolector.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../../../services/template/sweetalert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-recolector-create',
  templateUrl: './recolector-create.component.html',
  styleUrls: ['./recolector-create.component.css']
})
export class RecolectorCreateComponent implements OnInit {

  public createForm: FormGroup;
  public select_cities: string = '';;
  public colombiaJson:any;
  public departaments:any ;
  public cities:any = [];
  
  constructor(
    private RecolectorService:RecolectorService,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlertService,
    private formBuilder: FormBuilder,
    private router: Router,
    private httpClient: HttpClient
  ) 
  {
    this.httpClient.get("assets/js/places/colombia.min.json").subscribe(data =>{
      this.colombiaJson = data;
    });
    this.httpClient.get("assets/js/places/departamentos.json").subscribe(data =>{
      this.departaments = data;
    });

    this.createForm = this.formBuilder.group({
      name: ['',  [Validators.required, Validators.maxLength(100)]],
      lastname: ['',  [Validators.required, Validators.maxLength(100)]],
      email: ['',  [Validators.required, Validators.email, Validators.maxLength(100)]],
      password : ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      identification: ['',  [Validators.required,Validators.maxLength(20)]],
      address: ['',  [Validators.required, Validators.maxLength(40)]],
      country: ['Colombia',  [Validators.maxLength(30)]],
      department: ['',  [Validators.required,Validators.maxLength(30)]],
      city: ['',  [Validators.required,Validators.maxLength(30)]],
      telephone: ['',  [Validators.required,Validators.maxLength(30)]],
    });
    
  }

  ngOnInit(): void {
  }

  public async createRecolector(form:FormGroup){
    console.log(form.value)
    this.spinner.show();
    this.RecolectorService.createRecolector(form.value)
    .subscribe(
      (data:any)=>{
        this.spinner.hide();
        console.log(data);
        this.router.navigate(['admin/recolector'])
        this.sweetAlert.showBasicInfoSwal(
          "¡Éxito!",
          "Recolector create correctamente",
          false,
          "btn btn-success",
          "success"
        );
      },
      (err)=>{
        console.log(err);
        if(err.error[0].email != undefined){
          if(err.error[0].email[0] == "email_used"){
            this.sweetAlert.showBasicInfoSwal(
              "¡Error al registrarse!",
              "El correo ingresado ya está en uso",
              false,
              "btn btn-success",
              "warning"
            );
          }
          else{
            this.sweetAlert.showBasicInfoSwal(
              "¡Error al registrarse!",
              "Por favor verifique el correo ingresado",
              false,
              "btn btn-success",
              "warning"
            );
          }
        }
        else if(err.error[0].identification != undefined){
          if(err.error[0].identification[0] == "identification_used"){
            this.sweetAlert.showBasicInfoSwal(
              "¡Error al registrarse!",
              "La identificación ingresada ya está en uso",
              false,
              "btn btn-success",
              "warning"
            );
          }
          else{
            this.sweetAlert.showBasicInfoSwal(
              "¡Error al registrarse!",
              "Por favor verifique la identificación ingresada",
              false,
              "btn btn-success",
              "warning"
            );
          }
        }
        else if(err.error[0].password != undefined){
          if(err.error[0].password[0] == "password_regex"){
            this.sweetAlert.showBasicInfoSwal(
              "¡Error al registrarse!",
              "La contraseña debe contener al menos 1 número, 1 mayúscula y un carácter especial",
              false,
              "btn btn-success",
              "warning"
            );
          }
          else{
            this.sweetAlert.showBasicInfoSwal(
              "¡Error al registrarse!",
              "Por favor verifique la contraseña ingresada",
              false,
              "btn btn-success",
              "warning"
            );
          }
        }
        else if(err.error[0].telephone != undefined){
          if(err.error[0].telephone[0] == "telephone_used"){
            this.sweetAlert.showBasicInfoSwal(
              "¡Error al registrarse!",
              "El teléfono ingresado ya está en uso",
              false,
              "btn btn-success",
              "warning"
            );
          }
          else{
            this.sweetAlert.showBasicInfoSwal(
              "¡Error al registrarse!",
              "Por favor verifique el teléfono ingresado",
              false,
              "btn btn-success",
              "warning"
            );
          }
        }
        else{
          this.sweetAlert.showBasicInfoSwal(
            "¡Error al registrarse!",
            "Por favor intente mas tarde",
            false,
            "btn btn-success",
            "warning"
          );
        }
        this.spinner.hide();
      }
    )
  }

  public loadCities(){
    this.spinner.show();
    var department = this.createForm.value.department;
    for(var depto of this.colombiaJson){
      if(depto.departamento == department){
        this.cities = depto.ciudades;
        this.spinner.hide();
      }
    }
  }

}
