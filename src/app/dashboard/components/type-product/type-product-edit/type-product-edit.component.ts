import { Component, OnInit } from '@angular/core';
import { TypeProductService } from '../../../../services/type-product.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../../services/template/sweetalert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';

@Component({
  selector: 'app-type-product-edit',
  templateUrl: './type-product-edit.component.html',
  styleUrls: ['./type-product-edit.component.css']
})
export class TypeProductEditComponent implements OnInit {

  public editForm: FormGroup;

  constructor(
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
    var description = this.route.snapshot.paramMap.get('description');
    this.editForm = this.formBuilder.group({
      id: [id,  [Validators.required]],
      name: [name,  [Validators.required, , Validators.maxLength(50)]],
      description : [description, [Validators.required]]
    });
    
   
  }

  ngOnInit(): void {
   
  }

  public async editTypeProduct(form:FormGroup){
    console.log(form.value)
    this.spinner.show();
    this.typeProductService.editTypeProduct(form.value).subscribe(
      (data:any)=>{
        console.log(data)
        this.router.navigate(['typeproduct']);
        this.sweetAlert.showBasicInfoSwal(
          "¡Éxito!",
          "Tipo de producto actualizado correctamente",
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
