import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../../services/template/sweetalert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';
import { ProviderService } from '../../../../services/provider.service';
import { TypeProductService } from '../../../../services/type-product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  public editForm: FormGroup;
  public providers: any = [];
  public types_products: any = [];

  public oldProduct:any = {
    "idproducttype": "",
    "idprovider": "",
    "state": "",
  }

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
    var id = this.route.snapshot.paramMap.get('id');
    var name = this.route.snapshot.paramMap.get('name');
    var points = this.route.snapshot.paramMap.get('points');
    var description = this.route.snapshot.paramMap.get('description');
    var state = this.route.snapshot.paramMap.get('state');
    var quantity = this.route.snapshot.paramMap.get('quantity');
    this.oldProduct.idproducttype = this.route.snapshot.paramMap.get('idproducttype');
    this.oldProduct.idprovider = this.route.snapshot.paramMap.get('idprovider');
    this.oldProduct.state = this.route.snapshot.paramMap.get('state');

    this.editForm = this.formBuilder.group({
      id: [id, [Validators.required]],
      name: [name,  [Validators.required, Validators.maxLength(100)]],
      points: [points,  [Validators.required, Validators.max(99999)]],
      description: [description, [Validators.required]],
      state : [state, [Validators.required]],
      quantity : [quantity, [Validators.required, Validators.max(1000)]]
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

  public async editProduct(form:FormGroup){
    console.log(form.value)
    this.spinner.show();
    this.productService.editProduct(form.value).subscribe(
      (data:any)=>{
        console.log(data)
        this.router.navigate(['product']);
        this.sweetAlert.showBasicInfoSwal(
          "¡Éxito!",
          "Proveedor actualizado correctamente",
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
          "¡Error al editar el Proveedor!",
          false,
          "btn btn-success",
          "warning"
        );
      }
    )
  }

}
