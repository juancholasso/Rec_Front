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
  selector: 'app-exchange-success',
  templateUrl: './exchange-success.component.html',
  styleUrls: ['./exchange-success.component.css']
})
export class ExchangeSuccessComponent implements OnInit {

  public order:any = null;

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
 
  }

  ngOnInit(): void {
    this.order = JSON.parse(this.route.snapshot.paramMap.get('data')); 
  }


}
