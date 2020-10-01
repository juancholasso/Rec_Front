import { Injectable } from '@angular/core';
import { Service } from './service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends Service{

  constructor(public http: HttpClient) { 
    super(http);
  }

  public getInvoices(){
    return this.http.get(this.URL+"/api/client/invoices", this.httpOptionsAuth);
  }

  public getProfile(){
    return this.http.get(this.URL+"/api/user/auth", this.httpOptionsAuth);
  }
}
