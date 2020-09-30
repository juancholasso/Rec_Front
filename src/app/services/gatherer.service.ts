import { Injectable } from '@angular/core';
import { Service } from './service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GathererService extends Service{

  constructor(public http: HttpClient) { 
    super(http);
  }

  public createGatherer(body:any){
    return this.http.post(this.URL+"/api/gathering/create", body, this.httpOptionsAuth);
  }
 
}
