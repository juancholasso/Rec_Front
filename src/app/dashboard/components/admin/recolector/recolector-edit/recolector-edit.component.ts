import { Component, OnInit } from '@angular/core';
import { RecolectorService } from '../../../../../services/recolector.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../../../services/template/sweetalert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-recolector-edit',
  templateUrl: './recolector-edit.component.html',
  styleUrls: ['./recolector-edit.component.css']
})
export class RecolectorEditComponent implements OnInit {

  public editForm: FormGroup;
  public recolector:any;
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
    private route: ActivatedRoute,
    private httpClient: HttpClient
  ) 
  {
    this.httpClient.get("assets/js/places/colombia.min.json").subscribe(data =>{
      this.colombiaJson = data;
      this.loadCities();
    });
    this.httpClient.get("assets/js/places/departamentos.json").subscribe(data =>{
      this.departaments = data;
    });
    this.recolector = JSON.parse(this.route.snapshot.paramMap.get('recolector'));
    console.log(this.recolector);
    this.editForm = this.formBuilder.group({
      id: [this.recolector.id,  [Validators.required]],
      name: [this.recolector.name,  [Validators.required, Validators.maxLength(100)]],
      lastname: [this.recolector.lastname,  [Validators.required, Validators.maxLength(100)]],
      email: [this.recolector.email,  [Validators.required, Validators.email, Validators.maxLength(100)]],
      password : ['#########', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      identification: [this.recolector.identification,  [Validators.required,Validators.maxLength(20)]],
      address: [this.recolector.address,  [Validators.required, Validators.maxLength(40)]],
      country: ['Colombia',  [Validators.maxLength(30)]],
      department: [this.recolector.department,  [Validators.required,Validators.maxLength(30)]],
      city: [this.recolector.city,  [Validators.required,Validators.maxLength(30)]],
      telephone: [this.recolector.telephone,  [Validators.required,Validators.maxLength(30)]],
    });
    
  }

  ngOnInit(): void {
   
  }

  public async editRecolector(form:FormGroup){
    var body = form.value;
    console.log(body)
    if(body.password = "#########"){
      body.password = "";
    }
    this.spinner.show();
    this.RecolectorService.updateRecolector(form.value.id, body)
    .subscribe(
      (data:any)=>{
        this.spinner.hide();
        console.log(data);
        this.router.navigate(['admin/recolector'])
        this.sweetAlert.showBasicInfoSwal(
          "¡Éxito!",
          "Recolector actualizado correctamente",
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
    var department = this.editForm.value.department;
    for(var depto of this.colombiaJson){
      if(depto.departamento == department){
        this.cities = depto.ciudades;
        this.spinner.hide();
      }
    }
  }
}
