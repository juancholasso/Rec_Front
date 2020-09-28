import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../services/template/sweetalert.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public products:any = [];

  constructor(
    private productService:ProductService,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlertService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getListProducts();
  }

  public getListProducts(){
    var request = this.productService.getProducts("");
    request.subscribe(
      (data:any)=>{
        console.log(data)
        this.products = data.data;
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

  public deleteProduct(id:Number){
    this.sweetAlert.showAnswerSwal(
      "Eliminar Tipo Producto - #"+id,
      "¿Está seguro que desea eliminar este tipo de producto?",
      "Cancelar",
      "Aceptar",
      "warning",
      (res:Boolean)=>{
        if(res){
          this.spinner.show();
          var request = this.productService.deleteProduct(id);
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
              this.getListProducts();
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
