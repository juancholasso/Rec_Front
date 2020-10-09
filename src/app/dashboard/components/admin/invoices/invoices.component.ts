import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../../services/template/sweetalert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  public invoices:any = [];

  constructor(
    private adminService:AdminService,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getListInvoices();
  }

  public getListInvoices(){
    var request = this.adminService.getInvoices();
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

  public editInvoice(invoice:any){
    this.router.navigate(['admin/invoices/detail', {"data":JSON.stringify(invoice)} ]);
  }


}
