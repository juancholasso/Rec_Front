import { Injectable } from '@angular/core';
import { Service } from './service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends Service{

  constructor(public http: HttpClient) { 
    super(http);
  }

  public createNotification(body:any){
    return this.http.post(this.URL+"/api/notification/create", body, this.httpOptionsAuth);
  }

  //For Recolector
  public getSendNotification(){
    return this.http.get(this.URL+"/api/notification/sent", this.httpOptionsAuth);
  }

  //For Client
  public getInboxNotification(){
    return this.http.get(this.URL+"/api/notification/inbox", this.httpOptionsAuth);
  }
 
}
