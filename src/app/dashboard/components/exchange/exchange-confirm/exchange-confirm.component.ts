import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../../services/template/sweetalert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProviderService } from '../../../../services/provider.service';
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
    private providerService:ProviderService,
    private typeProductService:TypeProductService,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlertService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) 
  {
    this.createForm = this.formBuilder.group({
      idproducttype: ['',  [Validators.required]],
      idprovider: ['',  [Validators.required]],
      name: ['',  [Validators.required, Validators.maxLength(100)]],
      points: ['',  [Validators.required, Validators.max(1000)]],
      description: ['',  [Validators.required]],
      state : ['', [Validators.required]],
      quantity : ['', [Validators.required, Validators.max(1000)]]
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
            min: 1,
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

  }
}
