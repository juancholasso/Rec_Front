import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SweetAlertService } from '../../services/template/sweetalert.service';
import { Router, CanActivate } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

// 

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private service:ApiService, 
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlertService
  )
  { 
    this.loginForm = this.formBuilder.group({
      email: ['',  [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]]
    });
  }

  ngOnInit(){
    
  }

  public async login(form:FormGroup){
    this.spinner.show();
    this.service.loginRequest(form.value).subscribe(
      (data:any)=>{
        console.log(data)
        localStorage.setItem("session", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        // this.service.getToken();
        // this.router.navigate(['songs']);
        this.spinner.hide();
      },
      (err:any)=>{
        if(err.error.name == "user_not_found"){
          this.spinner.hide();
          this.sweetAlert.showBasicInfoSwal(
            "¡Error al iniciar sesión!",
            "El usuario o contraseña no son correctos",
            false,
            "btn btn-success",
            "warning"
          );
        }
        else{
          this.spinner.hide();
          this.sweetAlert.showBasicInfoSwal(
            "¡Ha ocurrido un error!",
            "Por favor intente más tarde",
            false,
            "btn btn-success",
            "warning"
          );
        }
        console.clear();
      }
    )

  }


}
