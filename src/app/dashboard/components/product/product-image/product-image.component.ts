import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../../services/template/sweetalert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.css']
})
export class ProductImageComponent implements OnInit {

  public product:any;
  public images:any;
  public URL:String;

  constructor(
    private productService:ProductService,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlertService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) 
  {
    this.URL = this.productService.URL;
  }

  ngOnInit(): void {
    this.productService.getProduct(3).subscribe(
      (data:any)=>{
        this.product = data.product;
        this.images = data.images;
      },
      (err:any)=>{
        
      }
    )
  }

  public deleteImage(id:Number){

  }

}
