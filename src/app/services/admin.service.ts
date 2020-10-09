import { Injectable } from '@angular/core';
import { Service } from './service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends Service{

  constructor(public http: HttpClient) { 
    super(http);
  }

  public getInvoices(){
    return this.http.get(this.URL+"/api/admin/invoices", this.httpOptionsAuth);
  }

  public setStateInvoiceDetail(body:any){
    return this.http.post(this.URL+"/api/admin/invoices/detail/status", body, this.httpOptionsAuth);
  }

}
