import { Injectable } from '@angular/core';
import { Service } from './service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends Service{

  constructor(public http: HttpClient) { 
    super(http);
  }

  public getProviders(page:number){
    return this.http.get(this.URL+"/api/provider?p="+page, this.httpOptionsAuth);
  }

  public getProvidersBySelect(){
    return this.http.get(this.URL+"/api/provider/select", this.httpOptionsAuth);
  }

  public createProvider(body:any){
    return this.http.post(this.URL+"/api/provider/create", body, this.httpOptionsAuth);
  }

  public editProvider(body:any){
    return this.http.put(this.URL+"/api/provider/update", body, this.httpOptionsAuth);
  }
  
  public deleteProvider(id:Number){
    return this.http.delete(this.URL+"/api/provider/"+id, this.httpOptionsAuth);
  }
}
