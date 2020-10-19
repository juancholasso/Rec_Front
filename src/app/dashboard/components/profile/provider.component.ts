import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../../services/provider.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../services/template/sweetalert.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  public providers:any = [];

  constructor(
    private providerService:ProviderService,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlertService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getListProviders();
  }

  public getListProviders(){
    var request = this.providerService.getProviders(1);
    request.subscribe(
      (data:any)=>{
        console.log(data)
        this.providers = data.data;
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

  public deleteProvider(id:Number){
    this.sweetAlert.showAnswerSwal(
      "Eliminar Tipo Producto - #"+id,
      "¿Está seguro que desea eliminar este tipo de producto?",
      "Cancelar",
      "Aceptar",
      "warning",
      (res:Boolean)=>{
        if(res){
          this.spinner.show();
          var request = this.providerService.deleteProvider(id);
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
              this.getListProviders();
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
