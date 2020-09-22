import { Injectable } from '@angular/core';
import { Service } from './service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService extends Service{

  constructor(public http: HttpClient) { 
    super(http);
  }

  public createSchedule(body:any){
    return this.http.post(this.URL+"/api/client/schedule", body, this.httpOptionsAuth);
  }

  //For Recolector
  public getSchedulesAssigned(){
    return this.http.get(this.URL+"/api/recolector/schedules", this.httpOptionsAuth);
  }

  //For Client
  public getSchedulesCreated(){
    return this.http.get(this.URL+"/api/client/schedules", this.httpOptionsAuth);
  }
 
}
