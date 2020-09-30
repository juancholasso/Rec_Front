import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Service } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Service implements OnInit{

  constructor(public http: HttpClient) {
    super(http);
  }

  ngOnInit(): void {
  }

  public loginRequest(body:any) {
    var response = this.http.post(this.URL+"/login", body, this.httpOptions)
    this.getToken();
    return response;
  }

  public registerRequest(body:any) {
    var response = this.http.post(this.URL+"/signup", body, this.httpOptions)
    return response;
  }

  public isAuthenticated(){
    if(this.getToken() != null && this.getToken() != undefined){
        return true;
    }
    return false;
  }
}
