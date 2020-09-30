import { Injectable } from '@angular/core';
import { Service } from './service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService extends Service{

  constructor(public http: HttpClient) { 
    super(http);
  }

  public getProducts(queries:String){
    return this.http.get(this.URL+"/api/product?"+queries, this.httpOptionsAuth);
  }

  public buy(body:any){
    return this.http.post(this.URL+"/api/store/buy", body, this.httpOptionsAuth);
  }

}
