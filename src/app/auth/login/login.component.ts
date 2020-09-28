import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
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
    private service:AuthService, 
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
    localStorage.clear();
    this.service.loginRequest(form.value).subscribe(
      (data:any)=>{
        console.log(data)
        localStorage.setItem("token", data.token);
        localStorage.setItem("roles", JSON.stringify(data.roles));
        localStorage.setItem("permissions", JSON.stringify(data.permissions));
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("points", JSON.stringify(data.points));
        this.router.navigate(['home']);
        this.spinner.hide();
      },
      (err:any)=>{
        console.log(err)
        if(err.error.name == "user_not_found" || err.error.name == "password_incorrect" ){
          this.sweetAlert.showBasicInfoSwal(
            "¡Error al iniciar sesión!",
            "El usuario o contraseña no son correctos",
            false,
            "btn btn-success",
            "warning"
          );
        }
        else{
          this.sweetAlert.showBasicInfoSwal(
            "¡Ha ocurrido un error!",
            "Por favor intente más tarde",
            false,
            "btn btn-success",
            "warning"
          );
        }
        this.spinner.hide();
      }
    )
  }


  public async logout(){
    this.spinner.show();
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
