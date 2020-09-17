import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../../services/template/sweetalert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProviderService } from '../../../../services/provider.service';
import { TypeProductService } from '../../../../services/type-product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  public createForm: FormGroup;
  public providers: any = [];
  public types_products: any = [];

  constructor(
    private productService:ProductService,
    private providerService:ProviderService,
    private typeProductService:TypeProductService,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlertService,
    private formBuilder: FormBuilder,
    private router: Router,
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
    var loadedAll = 0;
    this.spinner.show();
    this.providerService.getProvidersBySelect().subscribe(
      (providers:any)=>{
        this.providers = providers;
        loadedAll++;
        if(loadedAll == 2){
          this.spinner.hide();
        }
      },
      (err:any)=>{
        this.sweetAlert.showBasicInfoSwal(
          "UPS, Algo salió mal!",
          "¡Intente más tarde!",
          false,
          "btn btn-success",
          "warning"
        );
      }
    );
    this.typeProductService.getTypeProductsBySelect().subscribe(
      (types_products:any)=>{
        this.types_products = types_products;
        loadedAll++;
        if(loadedAll == 2){
          this.spinner.hide();
        }
      },
      (err:any)=>{
        this.spinner.hide();
        this.sweetAlert.showBasicInfoSwal(
          "UPS, Algo salió mal!",
          "¡Intente más tarde!",
          false,
          "btn btn-success",
          "warning"
        );
      }
    );
  }

  public async createProduct(form:FormGroup){
    this.spinner.show();
    this.productService.createProduct(form.value).subscribe(
      (data:any)=>{
        console.log(data)
        this.router.navigate(['product']);
        this.sweetAlert.showBasicInfoSwal(
          "¡Éxito!",
          "Proveedor creado correctamente",
          false,
          "btn btn-success",
          "success"
        );
        this.spinner.hide();
      },
      (err:any)=>{
        console.log(err);
        this.spinner.hide();
        this.sweetAlert.showBasicInfoSwal(
          "UPS, Algo salió mal!",
          "¡Error al crear el Proveedor!",
          false,
          "btn btn-success",
          "warning"
        );
      }
    )
  }

}
