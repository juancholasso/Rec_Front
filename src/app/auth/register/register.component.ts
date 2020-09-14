import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SweetAlertService } from '../../services/template/sweetalert.service';
import { Router, CanActivate } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import ColombiaJson from '../../../assets/js/places/colombia.min.json';
import DepartamentosJson from '../../../assets/js/places/departamentos.json';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  public select_cities: string = '';;
  public registerForm: FormGroup;
  public departaments:any = DepartamentosJson;
  public cities:any = [];
  @ViewChild("select_city") myButton: ElementRef;

  constructor(
    private service:ApiService, 
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlertService,
    private cdr: ChangeDetectorRef,
  )
  { 
    this.registerForm = this.formBuilder.group({
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

  ngOnInit(){
    this.registerForm.controls['department']
    console.log(ColombiaJson);
  }

  public loadCities(){
    this.spinner.show();
    var department = this.registerForm.value.department;
    for(var depto of ColombiaJson){
      if(depto.departamento == department){
        this.cities = depto.ciudades;
      }
    }
  }

  register(form:FormGroup){
    this.spinner.show();
    this.service.registerRequest(this.registerForm.value)
    .subscribe(
      (data)=>{
        this.sweetAlert.showBasicSwal(
          "¡Registro Exitoso!",
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
          if(err.error[0].telephone[0] == "password_regex"){
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
}
