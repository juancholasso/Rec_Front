import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../../services/client.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../../services/template/sweetalert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';

@Component({
  selector: 'app-exchange-invoice-detail',
  templateUrl: './exchange-invoice-detail.component.html',
  styleUrls: ['./exchange-invoice-detail.component.css']
})
export class ExchangeInvoicesDetailComponent implements OnInit {

  public editForm: FormGroup;
  public invoice:any;

  constructor(
    private client:ClientService,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlertService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
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

}
