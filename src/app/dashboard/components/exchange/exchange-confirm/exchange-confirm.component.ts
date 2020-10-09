import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../../services/template/sweetalert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ExchangeService } from '../../../../services/exchange.service';
import { TypeProductService } from '../../../../services/type-product.service';
import { ClientService } from '../../../../services/client.service';

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
  public product:any;
  public URL:String = "";

  constructor(
    private productService:ProductService,
    private exchangeService:ExchangeService,
    private typeProductService:TypeProductService,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlertService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private clientService:ClientService,
  ) 
  {
    this.URL = this.exchangeService.URL;
    this.createForm = this.formBuilder.group({
    });
  }

  ngOnInit(): void {
    this.spinner.show();

    var data = JSON.parse(this.route.snapshot.paramMap.get('data'));
    this.product = data;

    this.nameProduct = data.name;
    this.priceProduct = data.points;
    this.totalPrice = parseInt(this.priceProduct)

    var slider = document.getElementById('sliderRegular');
    var quantity = data.quantity;

    this.clientService.getProfile()
    .subscribe(
      (data:any)=>{
        this.funds = data.points.points;

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

  public createOrder(form:FormGroup){
    this.spinner.show();
    var body ={
      "points":this.totalPrice,
      "products":[[this.product.id,this.countSlider]]
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
