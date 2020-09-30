import { Component, OnInit } from '@angular/core';
import { ExchangeService } from '../../../services/exchange.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../services/template/sweetalert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {

  public products:any = [];
  public URL:String = "";
  public points:Number = 1000;

  constructor(
    private exchangeService:ExchangeService,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlertService,
    private router: Router,

  ) {
    this.URL = this.exchangeService.URL;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.exchangeService.getProducts("")
    .subscribe(
      (data:any)=>{
        this.products = data.data;
        console.log(this.products)
        this.spinner.hide();
      },
      (err)=>{
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

  public generateOrder(product:any){
    this.router.navigate(['exchange/confirm', product]);
  }

}
