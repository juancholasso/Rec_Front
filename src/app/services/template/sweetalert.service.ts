import * as swal from '../../../assets/js/plugins/sweetalert2'
import { Service } from '../service.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() {
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

  public showAnswerSwal(title, text, cancelText, confirmText, type, callback){
    try{
        swal({
          title: title,
            text: text,
            type: type,
            showCancelButton: true,
            confirmButtonText: confirmText,
            cancelButtonText: cancelText,
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: "btn btn-danger",
            buttonsStyling: false
        }).then(function() {
          callback(true);
        }, function(dismiss) {
          if (dismiss === 'cancel') {
            callback(false);
          }
        })
    }catch(err){}
  }

  public showTitleAndTextSwal(title, text){
    try{
        swal({
          title: title,
          text: text,
          buttonsStyling: false,
          confirmButtonClass: "btn btn-info"
        })
    }catch(err){}
  }

  public showMessageAndButtonCallbackSwal(title, text, callbackText, callback){
    try{
        swal({
          title: title,
          text: text,
          buttonsStyling: false,
          showCancelButton: true,
          confirmButtonClass: "btn btn-info",
          cancelButtonClass: 'btn btn-success',
          cancelButtonText: callbackText,
        }).then(function() {
          callback(true);
        }, function(dismiss) {
          if (dismiss === 'cancel') {
            callback(false);
          }
        });
    }catch(err){}
  }

  public showInputSwal(title, html, confirmText, cancelText, callback){
    swal({
        title: title,
        html: html,
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        buttonsStyling: false
    }).then(function(result) {
      callback(result)
    })
  }
}
