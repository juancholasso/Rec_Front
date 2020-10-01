import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../../services/template/sweetalert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ExchangeService } from '../../../../services/exchange.service';
import { TypeProductService } from '../../../../services/type-product.service';

declare var noUiSlider: any;
declare var sliderRegular: any;

@Component({
  selector: 'app-exchange-confirm-create',
  templateUrl: './exchange-confirm.component.html',
  styleUrls: ['./exchange-confirm.component.css']
})
export class ExchangeConfirmComponent implements OnInit {

  public createForm: FormGroup;
  public providers: any = [];
  public types_products: any = [];
  public totalPrice = 0;
  public countSlider = 1;
  public nameProduct = "";
  public priceProduct = "";
  public insufficientFunds = false;
  public funds = 0;

  constructor(
    private productService:ProductService,
    private exchangeService:ExchangeService,
    private typeProductService:TypeProductService,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlertService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) 
  {
    this.createForm = this.formBuilder.group({
    });
  }

  ngOnInit(): void {
    var slider = document.getElementById('sliderRegular');
    var quantity = this.route.snapshot.paramMap.get('quantity');

    this.funds = JSON.parse(localStorage.getItem('points')).points;
    this.nameProduct = this.route.snapshot.paramMap.get('name');
    this.priceProduct = this.route.snapshot.paramMap.get('points');
    this.totalPrice = parseInt(this.priceProduct)

    if(this.totalPrice > this.funds){
      this.insufficientFunds = true;
    }
    else{
      this.insufficientFunds = false;
    }

    noUiSlider.create(slider, {
        start: 1,
        connect: [true,false],
        range: {
            min: 0,
            max: parseInt(quantity)
        }
    });

    sliderRegular.noUiSlider.on('change', (event)=>{
      this.countSlider = parseInt(event[0]);
      this.totalPrice = parseInt(event[0])*parseInt(this.priceProduct);
      if(this.totalPrice > this.funds){
        this.insufficientFunds = true;
      }
      else{
        this.insufficientFunds = false;
      }
    });

  }

  public createOrder(form:FormGroup){
    this.spinner.show();
    var body ={
      "points":this.totalPrice,
      "products":[[this.route.snapshot.paramMap.get('id'),this.countSlider]]
    }
    this.exchangeService.buy(body)
    .subscribe(
      (data:any)=>{
        this.spinner.hide();
        this.router.navigate(['exchange/success', {"data":JSON.stringify(data)}]);
      },
      (err:any)=>{
        this.spinner.hide();
        this.sweetAlert.showBasicInfoSwal(
          "¡Ha ocurrido un error!",
          "Por favor intente más tarde",
          false,
          "btn btn-success",
          "warning"
        );
      }
    )
  }
}
