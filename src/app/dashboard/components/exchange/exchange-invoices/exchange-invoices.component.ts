import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../../services/client.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../../services/template/sweetalert.service';
import { Router, ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-exchange-invoices',
  templateUrl: './exchange-invoices.component.html',
  styleUrls: ['./exchange-invoices.component.css']
})
export class ExchangeInvoicesComponent implements OnInit {

  public invoices:any = [];

  constructor(
    private clientService:ClientService,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlertService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
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

  public showInvoice(invoice:any){
    this.router.navigate(['exchange/invoices/detail', JSON.stringify({"data":invoice})])
  }

}
