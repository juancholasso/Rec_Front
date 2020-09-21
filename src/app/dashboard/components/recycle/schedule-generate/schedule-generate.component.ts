import { Component, OnInit, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetAlertService } from '../../../../services/template/sweetalert.service';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ScheduleService } from '../../../../services/schedule.service';
import { TypeProductService } from '../../../../services/type-product.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { Moment } from 'moment';
import { HttpClient } from "@angular/common/http";

declare const $: any;
declare const demo: any;

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
selector: 'app-schedule-generate',
templateUrl: './schedule-generate.component.html',
styleUrls: ['./schedule-generate.component.css']
})
export class ScheduleGenerateComponent implements OnInit {

    public createForm: FormGroup;
    public date:Moment;
    public zone:String = "";
    public radioOption:any;
    public option:Number = 0;
    public city:any;
    public department:any;
    public colombiaJson:any;
    public departaments:any ;
    public cities:any = [];
    public address:any;
    public telephone:any;
    public page:number = 0;

    constructor(
        private productService:ProductService,
        private scheduleService:ScheduleService,
        private typeProductService:TypeProductService,
        private spinner: NgxSpinnerService,
        private sweetAlert: SweetAlertService,
        private formBuilder: FormBuilder,
        private router: Router,
        private httpClient: HttpClient
    ) 
    {
        this.httpClient.get("assets/js/places/colombia.min.json").subscribe(data =>{
            this.colombiaJson = data;
        });
        this.httpClient.get("assets/js/places/departamentos.json").subscribe(data =>{
            this.departaments = data;
        });

        this.createForm = this.formBuilder.group({
            address: ['',  [Validators.required, Validators.maxLength(40)]],
            country: ['Colombia',  [Validators.maxLength(30)]],
            department: ['',  [Validators.required,Validators.maxLength(30)]],
            city: ['',  [Validators.required,Validators.maxLength(30)]],
            telephone: ['',  [Validators.required,Validators.maxLength(30)]],
            startdate : ['', [Validators.required]],
            enddate : ['', [Validators.required]],
            latitude : ['1.0000', [Validators.required]],
            longitude : ['1.0000', [Validators.required]]
        });
    }

    createSchedule(form:FormGroup){
        this.spinner.show();
        this.scheduleService.createSchedule(form.value).subscribe(
            (data:any)=>{
                this.spinner.hide();
                this.router.navigate(['home'])
                this.sweetAlert.showBasicInfoSwal(
                    "Éxito",
                    "Se ha realizado correctamente la agendación de su cita",
                    false,
                    "btn btn-success",
                    "success"
                );
            },
            (err:any)=>{
                this.spinner.hide();
                this.sweetAlert.showBasicInfoSwal(
                    "¡Error al agendar!",
                    "Verifique los datos ingresados",
                    false,
                    "btn btn-success",
                    "warning"
                );
            }
        )
    }

    public loadForm(){
        if(this.date != undefined){
            var startdate = this.date.toISOString().split('T')[0]+" "+this.zone.split(',')[0];
            var enddate = this.date.toISOString().split('T')[0]+" "+this.zone.split(',')[1];
    
            if(this.option == 1){
                this.createForm.setValue({
                    "address":this.address,
                    "city":this.city,
                    "department":this.department,
                    "country":"Colombia",
                    "telephone":this.telephone,
                    "startdate":startdate,
                    "enddate":enddate,
                    "latitude":"1.0000",
                    "longitude":"1.0000"
                })
            }
            else{
                var user:any = JSON.parse(localStorage.getItem('user'));
                this.createForm.setValue({
                    "address":user.address,
                    "city":user.city,
                    "department":user.department,
                    "country":user.country,
                    "telephone":user.telephone,
                    "startdate":startdate,
                    "enddate":enddate,
                    "latitude":"3.123123",
                    "longitude":"2.3123213"
                })
            }
        }
    }

    public openDatePicker(){
        $('.mat-button-base').click();
    }

    public changeOption(id:Number){
        console.log(id)
        this.option = id;
    }

    public loadCities(dep){
        this.department = dep;
        var department = this.department
        for(var depto of this.colombiaJson){
            if(depto.departamento == department){
                this.cities = depto.ciudades;
            }
        }
    }

    ngOnInit() {
        demo.initMaterialWizard();
        demo.initDashboardPageCharts();
        demo.initCharts();
        this.ngInitWizard();
    }

    ngOnChanges(changes: SimpleChanges) {
        const input = $(this);

        if (input[0].files && input[0].files[0]) {
            const reader: any = new FileReader();

            reader.onload = function (e: any) {
                $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
            };
            reader.readAsDataURL(input[0].files[0]);
        }
    }

    ngAfterViewInit() {
        $( window ).resize( () => { $('.card-wizard').each(function(){
            setTimeout(() => {
            const $wizard = $(this);
            const index = $wizard.bootstrapWizard('currentIndex');
            let $total = $wizard.find('.nav li').length;
            let  $li_width = 100/$total;

            let total_steps = $wizard.find('.nav li').length;
            let move_distance = $wizard.width() / total_steps;
            let index_temp = index;
            let vertical_level = 0;

            let mobile_device = $(document).width() < 600 && $total > 3;
            if(mobile_device){
                move_distance = $wizard.width() / 2;
                index_temp = index % 2;
                $li_width = 50;
            }

            $wizard.find('.nav li').css('width',$li_width + '%');

            let step_width = move_distance;
            move_distance = move_distance * index_temp;

            let $current = index + 1;

            if($current == 1 || (mobile_device == true && (index % 2 == 0) )){
                move_distance -= 8;
            } else if($current == total_steps || (mobile_device == true && (index % 2 == 1))){
                move_distance += 8;
            }

            if(mobile_device){
                let x: any = index / 2;
                vertical_level = parseInt(x);
                vertical_level = vertical_level * 38;
            }

            $wizard.find('.moving-tab').css('width', step_width);
            $('.moving-tab').css({
                'transform':'translate3d(' + move_distance + 'px, ' + vertical_level +  'px, 0)',
                'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'
            });

            $('.moving-tab').css({
                'transition': 'transform 0s'
            });
            },500)

            });
        });

    }

    public ngInitWizard(){
        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');

        // Wizard Initialization
        $('.card-wizard').bootstrapWizard({
            'tabClass': 'nav nav-pills',
            'nextSelector': '.btn-next',
            'previousSelector': '.btn-previous',

            onInit: function(tab: any, navigation: any, index: any){

                // check number of tabs and fill the entire row
                let $total = navigation.find('li').length;
                let $wizard = navigation.closest('.card-wizard');

                let $first_li = navigation.find('li:first-child a').html();
                let $moving_div = $('<div class="moving-tab">' + $first_li + '</div>');
                $('.card-wizard .wizard-navigation').append($moving_div);

                $total = $wizard.find('.nav li').length;
                let  $li_width = 100/$total;

                let total_steps = $wizard.find('.nav li').length;
                let move_distance = $wizard.width() / total_steps;
                let index_temp = index;
                let vertical_level = 0;

                let mobile_device = $(document).width() < 600 && $total > 3;

                if(mobile_device){
                    move_distance = $wizard.width() / 2;
                    index_temp = index % 2;
                    $li_width = 50;
                }

                $wizard.find('.nav li').css('width',$li_width + '%');

                let step_width = move_distance;
                move_distance = move_distance * index_temp;

                let $current = index + 1;

                if($current == 1 || (mobile_device == true && (index % 2 == 0) )){
                    move_distance -= 8;
                } else if($current == total_steps || (mobile_device == true && (index % 2 == 1))){
                    move_distance += 8;
                }

                if(mobile_device){
                    let x: any = index / 2;
                    vertical_level = parseInt(x);
                    vertical_level = vertical_level * 38;
                }

                $wizard.find('.moving-tab').css('width', step_width);
                $('.moving-tab').css({
                    'transform':'translate3d(' + move_distance + 'px, ' + vertical_level +  'px, 0)',
                    'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

                });
                $('.moving-tab').css('transition','transform 0s');
            },

            onTabClick : function(tab: any, navigation: any, index: any){

                const $valid = $('.card-wizard form').valid();

                if (!$valid) {
                    return false;
                } else {
                    return true;
                }
            },

            onTabShow: function(tab: any, navigation: any, index: any) {
                let $total = navigation.find('li').length;
                let $current = index + 1;
                elemMainPanel.scrollTop = 0;
                const $wizard = navigation.closest('.card-wizard');

                // If it's the last tab then hide the last button and show the finish instead
                if ($current >= $total) {
                    $($wizard).find('.btn-next').hide();
                    $($wizard).find('.btn-finish').show();
                } else {
                    $($wizard).find('.btn-next').show();
                    $($wizard).find('.btn-finish').hide();
                }

                const button_text = navigation.find('li:nth-child(' + $current + ') a').html();

                setTimeout(function(){
                    $('.moving-tab').text(button_text);
                }, 150);

                const checkbox = $('.footer-checkbox');

                if ( index !== 0 ) {
                    $(checkbox).css({
                        'opacity':'0',
                        'visibility':'hidden',
                        'position':'absolute'
                    });
                } else {
                    $(checkbox).css({
                        'opacity':'1',
                        'visibility':'visible'
                    });
                }
                $total = $wizard.find('.nav li').length;
                let  $li_width = 100/$total;

                let total_steps = $wizard.find('.nav li').length;
                let move_distance = $wizard.width() / total_steps;
                let index_temp = index;
                let vertical_level = 0;

                let mobile_device = $(document).width() < 600 && $total > 3;

                if(mobile_device){
                    move_distance = $wizard.width() / 2;
                    index_temp = index % 2;
                    $li_width = 50;
                }

                $wizard.find('.nav li').css('width',$li_width + '%');

                let step_width = move_distance;
                move_distance = move_distance * index_temp;

                $current = index + 1;

                if($current == 1 || (mobile_device == true && (index % 2 == 0) )){
                    move_distance -= 8;
                } else if($current == total_steps || (mobile_device == true && (index % 2 == 1))){
                    move_distance += 8;
                }

                if(mobile_device){
                    let x: any = index / 2;
                    vertical_level = parseInt(x);
                    vertical_level = vertical_level * 38;
                }

                $wizard.find('.moving-tab').css('width', step_width);
                $('.moving-tab').css({
                    'transform':'translate3d(' + move_distance + 'px, ' + vertical_level +  'px, 0)',
                    'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

                });
            }
        });

        // Prepare the preview for profile picture
        $('#wizard-picture').change(function(){
            const input = $(this);

            if (input[0].files && input[0].files[0]) {
                const reader = new FileReader();

                reader.onload = function (e: any) {
                    $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
                };
                reader.readAsDataURL(input[0].files[0]);
            }
        });

        $('[data-toggle="wizard-radio"]').click(function(){
            const wizard = $(this).closest('.card-wizard');
            wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
            $(this).addClass('active');
            $(wizard).find('[type="radio"]').removeAttr('checked');
            $(this).find('[type="radio"]').attr('checked', 'true');
        });

        $('[data-toggle="wizard-checkbox"]').click(function(){
            if ( $(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).find('[type="checkbox"]').removeAttr('checked');
            } else {
                $(this).addClass('active');
                $(this).find('[type="checkbox"]').attr('checked', 'true');
            }
        });

        $('.set-full-height').css('height', 'auto');
    }
}
