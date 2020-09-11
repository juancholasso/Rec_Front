import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  public bodyLogin:any = {
    "name":"",
    "lastname":"",
    "email":"",
    "password":"",
    "identification":null,
    "address":"",
    "city":"",
    "department":"",
    "country":"",
    "telephone":""
  }

  constructor(private service:ApiService, public router: Router) { }

  ngOnInit(): void {
  }

  signUp(){
    this.service.signUp(this.bodyLogin)
    .subscribe(
      (data)=>{
        console.log(data);
      },
      (err)=>{
        console.log(err);
        alert("error")
      }
    )
  }
}
