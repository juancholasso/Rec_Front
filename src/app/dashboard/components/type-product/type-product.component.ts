import { Component, OnInit } from '@angular/core';
import { TypeProductService } from '../../../services/type-product.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../services/template/sweetalert.service';

@Component({
  selector: 'app-type-product',
  templateUrl: './type-product.component.html',
  styleUrls: ['./type-product.component.css']
})
export class TypeProductComponent implements OnInit {

  public typeProducts:any = [];

  constructor(
    private typeProductService:TypeProductService,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlertService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getListProductTypes();
  }

  public getListProductTypes(){
    var request = this.typeProductService.getTypeProducts(1);
    request.subscribe(
      (data:any)=>{
        console.log(data)
        this.typeProducts = data.data;
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

  public deleteTypeProduct(id:Number){
    this.sweetAlert.showAnswerSwal(
      "Eliminar Tipo Producto - #"+id,
      "¿Está seguro que desea eliminar este tipo de producto?",
      "Cancelar",
      "Aceptar",
      "warning",
      (res:Boolean)=>{
        if(res){
          this.spinner.show();
          var request = this.typeProductService.deleteTypeProduct(id);
          request.subscribe(
            (data:any)=>{
              console.log(data)
              this.sweetAlert.showBasicInfoSwal(
                "¡Éxito!",
                "Tipo de producto eliminado correctamente",
                false,
                "btn btn-success",
                "success"
              );
              this.getListProductTypes();
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
      }
    )
  }
}
