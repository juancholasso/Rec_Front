import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../services/template/sweetalert.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  public notifications:any = [];

  constructor(
    private productService:ProductService,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlertService,
    private notificationService:NotificationService,
  ) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  public getStringDate(date:String){
    var dateNotification = date.split("T");
    return (dateNotification[0]+' '+dateNotification[1].split(".")[0]);
  }

  public loadNotifications(){
    this.spinner.show();
    this.notificationService.getInboxNotification()
    .subscribe(
      (data:any)=>{      
        this.notifications = data;
        this.spinner.hide();
      },
      (err:any)=>{
        this.spinner.hide();
      }
    )
  }
  
}
