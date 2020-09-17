import { Injectable } from '@angular/core';
import { Service } from './service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeProductService extends Service{

  constructor(public http: HttpClient) { 
    super(http);
  }

  public getTypeProducts(page:number){
    return this.http.get(this.URL+"/api/producttype?p="+page, this.httpOptionsAuth);
  }

  public getTypeProductsBySelect(){
    return this.http.get(this.URL+"/api/producttype/select", this.httpOptionsAuth);
  }

  public createTypeProduct(body:any){
    return this.http.post(this.URL+"/api/producttype/create", body, this.httpOptionsAuth);
  }

  public editTypeProduct(body:any){
    return this.http.put(this.URL+"/api/producttype/update", body, this.httpOptionsAuth);
  }
  
  public deleteTypeProduct(id:Number){
    return this.http.delete(this.URL+"/api/producttype/"+id, this.httpOptionsAuth);
  }
}
