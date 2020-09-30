import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  public name:String = "";
  public points:String = "";
  public roles:any = [];

  constructor(private service:AuthService, public router: Router) { 
    this.roles = JSON.parse(localStorage.getItem('roles'));
  }

  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem('user')).name;
    this.points = JSON.parse(localStorage.getItem('points')).points;
    setInterval(() => { 
      this.name = JSON.parse(localStorage.getItem('user')).name;
      this.points = JSON.parse(localStorage.getItem('points')).points;
    }, 300000)
  }

  public logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  public navigateTo(path:string){
    this.router.navigate([path]);
  }

  public can(expectedRole:String){
    for(let role of this.roles){
        if(role == expectedRole || role == "super_admin"){
            return true;
        }
    }
    return false;
  }
}
