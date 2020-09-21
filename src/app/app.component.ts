import { Component, NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontendInalambria';

  public isLogged:boolean = false;
  private localStorageService;
  email:string = '';
  password:string = '';
  user:any;

  constructor(private service:AuthService) {
    var user = localStorage.getItem("isLogged");
    if(user == "true"){
      this.isLogged = true;
    }
    else{
      this.isLogged = false;
    }
  }

  public login(){
    // console.log(this.email)
    // console.log(this.password)
    // this.service.makeLogin(this.email, this.password).subscribe(
    //   (data:any)=>{
    //     localStorage.setItem("token", data.token);
    //     localStorage.setItem("isLogged", "true");
    //     this.isLogged = true;
    //     this.user = data.user;
    //   },
    //   (err)=>{
    //     console.log(err)
    //   }
    // )
  }

  public logout(){
    // this.service.makeLogout().subscribe(
    //   (data:any)=>{
    //     localStorage.clear();
    //     this.isLogged = false;
    //   },
    //   (err)=>{
    //     localStorage.clear();
    //     this.isLogged = false;
    //   }
    // )
  }
  

  ngOnInit(): void {
  }

}
