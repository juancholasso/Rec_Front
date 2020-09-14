import * as swal from '../../../assets/js/plugins/sweetalert2'
import { Service } from '../service.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService extends Service{

  constructor() {
    super();
  }

  public showBasicSwal(title, buttonsStyling, confirmButtonClass){
    try{
        swal({
            title: title,
            buttonsStyling: buttonsStyling,
            confirmButtonClass: confirmButtonClass
        })
    }catch(err){}
  }

  public showBasicInfoSwal(title, text, buttonsStyling, confirmButtonClass, type){
    try{
        swal({
            title: title,
            text: text,
            buttonsStyling: buttonsStyling,
            confirmButtonClass: confirmButtonClass,
            type: type
        })
    }catch(err){}
  }
}
