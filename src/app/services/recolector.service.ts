import { Injectable } from '@angular/core';
import { Service } from './service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecolectorService extends Service{

  constructor(public http: HttpClient) { 
    super(http);
  }

  public getRecolectors(){
    return this.http.get(this.URL+"/api/admin/recolector", this.httpOptionsAuth);
  }

  public createRecolector(body:any){
    return this.http.post(this.URL+"/api/admin/recolector/create", body, this.httpOptionsAuth);
  }

  public updateRecolector(id:Number,body:any){
    return this.http.put(this.URL+"/api/admin/recolector/update/"+id, body, this.httpOptionsAuth);
  }

  public deleteRecolector(id:Number){
    return this.http.delete(this.URL+"/api/admin/recolector/"+id, this.httpOptionsAuth);
  }
 
}
