import { Component, OnInit } from '@angular/core';
import { TypeProductService } from '../../../../services/type-product.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../../services/template/sweetalert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-type-product-create',
  templateUrl: './type-product-create.component.html',
  styleUrls: ['./type-product-create.component.css']
})
export class TypeProductCreateComponent implements OnInit {

  public createForm: FormGroup;

  constructor(
    private typeProductService:TypeProductService,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlertService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) 
  {
    this.createForm = this.formBuilder.group({
      name: ['',  [Validators.required, Validators.maxLength(50)]],
      description : ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  public async createTypeProduct(form:FormGroup){
    this.spinner.show();
    this.typeProductService.createTypeProduct(form.value).subscribe(
      (data:any)=>{
        console.log(data)
        this.router.navigate(['typeproduct']);
        this.sweetAlert.showBasicInfoSwal(
          "¡Éxito!",
          "Tipo de producto creado correctamente",
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
          "¡Error al crear tipo de producto!",
          false,
          "btn btn-success",
          "warning"
        );
      }
    )
  }

}
