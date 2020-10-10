import { Component, OnInit } from '@angular/core';
import { RecolectorService } from '../../../../services/recolector.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../../services/template/sweetalert.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recolector',
  templateUrl: './recolector.component.html',
  styleUrls: ['./recolector.component.css']
})
export class RecolectorComponent implements OnInit {

  public recolectors:any = [];

  constructor(
    private recolectorService:RecolectorService,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlertService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getListRecolectors();
  }

  public edit(recolector:any){
    this.router.navigate(['admin/recolector/edit',{"recolector":JSON.stringify(recolector)}])
  }

  public getListRecolectors(){
    this.recolectorService.getRecolectors()
    .subscribe(
      (data:any)=>{
        this.recolectors = data;
        this.spinner.hide();
        console.log(data);
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

  public deleteRecolector(id:Number){
    this.sweetAlert.showAnswerSwal(
      "Eliminar Recolector - #"+id,
      "¿Está seguro que desea eliminar este recolector?",
      "Cancelar",
      "Aceptar",
      "warning",
      (res:Boolean)=>{
        if(res){
          this.spinner.show()
          this.recolectorService.deleteRecolector(id)
          .subscribe(
            (data:any)=>{
              this.getListRecolectors();
            },
            (err)=>{
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
