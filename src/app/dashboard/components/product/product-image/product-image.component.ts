import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../../services/template/sweetalert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.css']
})
export class ProductImageComponent implements OnInit {

  public idproduct;
  public product:any;
  public images:any = [];
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
    this.idproduct = this.route.snapshot.paramMap.get("id")
    this.spinner.show();
    this.productService.getProduct(this.idproduct).subscribe(
      (data:any)=>{
        this.product = data.product;
        this.images = data.images;
        this.spinner.hide();
      },
      (err:any)=>{
        
      }
    )
  }

  public loadImage(event:any){
    try{
      this.spinner.show();
      var file = event.target.files[0];
      var formData = new FormData();
      formData.append('image', file, file.name);
      this.productService.uploadImageProduct(this.idproduct, formData).subscribe(
        (data:any)=>{
          $('#img_loaded').hide();
          this.images.push(data)
          console.log(data);
          $('#img_default').show();
          $('#span_txt_btn').show();
          this.spinner.hide();
        },
        (err:any)=>{
          this.spinner.hide();
          console.log(err);
        }
      )
    }
    catch(exception){
      this.spinner.hide();
    }
  }

  public deleteImage(id:Number){
    try{
      this.spinner.show();
      this.productService.deleteImageProduct(this.idproduct, id).subscribe(
        (data:any)=>{
          this.images = this.images.filter( item => item.id != id);
          this.spinner.hide();
        },
        (err:any)=>{
          this.spinner.hide();
          console.log(err);
        }
      )
    }
    catch(exception){
      this.spinner.hide();
    }
  }

}
