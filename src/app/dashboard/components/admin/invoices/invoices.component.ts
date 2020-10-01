import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../../services/client.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../../services/template/sweetalert.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  public invoices:any = [];

  constructor(
    private clientService:ClientService,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlertService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getListInvoices();
  }

  public getListInvoices(){
    var request = this.clientService.getInvoices();
    request.subscribe(
      (data:any)=>{
        console.log(data)
        this.invoices = data;
        this.spinner.hide();
      },
      (err:any)=>{
        console.log(err);
        this.sweetAlert.showBasicInfoSwal(
          "¡Ha ocurrido un error!",
          "Por favor intente más tarde",
          false,
          "btn btn-success",
          "warning"
        );
        this.spinner.hide();
      }
    )
  }

}
