import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  
  constructor(private service:AuthService, public router: Router) { }

  ngOnInit(): void {
  }

  public logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  public navigateTo(path:string){
    this.router.navigate([path]);
  }
}
