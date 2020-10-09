import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../../services/admin.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../../../services/template/sweetalert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';

@Component({
  selector: 'app-invoices-detail-edit',
  templateUrl: './invoices-detail.component.html',
  styleUrls: ['./invoices-detail.component.css']
})
export class InvoicesDetailComponent implements OnInit {

  public editForm: FormGroup;
  public invoice:any;

  constructor(
    private adminService:AdminService,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlertService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) 
  {
    this.editForm = this.formBuilder.group({
      // id: [id, [Validators.required]],
      // name: [name,  [Validators.required, Validators.maxLength(100)]],
      // points: [points,  [Validators.required, Validators.max(99999)]],
      // description: [description, [Validators.required]],
      // state : [state, [Validators.required]],
      // quantity : [quantity, [Validators.required, Validators.max(1000)]]
    });
  }

  ngOnInit(): void {
    this.invoice = JSON.parse(this.route.snapshot.paramMap.get('data'));
    console.log(this.invoice);
  }

  editInvoice(form:FormGroup){

  }


  setStateInvoiceDetail(idorder, token, state, index){
    this.spinner.show();

    var body ={
      "idorder":idorder,
      "token":token,
      "state":parseInt(state)
    };
    
    var request = this.adminService.setStateInvoiceDetail(body);
    request.subscribe(
      (data:any)=>{
        console.log(data)
        this.invoice.state = data.order.state;
        this.invoice.details[index].statetoken = state;
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
