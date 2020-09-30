import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import { NgxSpinnerService } from "ngx-spinner";

const misc: any = {
  navbar_menu_visible: 0,
  active_collapse: true,
  disabled_collapse_init: 0,
};

declare var $: any;
declare var mobile_menu_initialized: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public notifications:any = [];
  public countNotifications = 0;

  constructor(
    private notificationService:NotificationService,
    private spinner: NgxSpinnerService,
  ) { 
    
  }

  minimizeSidebar(){
    const body = document.getElementsByTagName('body')[0];

    if (misc.sidebar_mini_active === true) {
        body.classList.remove('sidebar-mini');
        misc.sidebar_mini_active = false;

    } else {
        setTimeout(function() {
            body.classList.add('sidebar-mini');
            misc.sidebar_mini_active = true;
        }, 300);
    }

    // we simulate the window Resize so the charts will get updated in realtime.
    const simulateWindowResize = setInterval(function() {
        window.dispatchEvent(new Event('resize'));
    }, 180);

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(function() {
        clearInterval(simulateWindowResize);
    }, 1000);
  }

  ngOnInit(): void {
    this.loadNotifications();
    this.makeResponsive();

    setInterval(() => { 
      this.loadNotifications();
    }, 600000)
  }

  public makeResponsive(){
    var sidebar_wrapper = $('.sidebar-wrapper');
    if ($(window).width() < 991) {  
      var navbar = $('nav').find('.navbar-collapse').children('.navbar-nav');

      var nav_content = navbar.html();

      nav_content = '<ul class="nav navbar-nav nav-mobile-menu">' + nav_content + '</ul>';

      let navbar_form = $('nav').find('.navbar-form').get(0).outerHTML;

      var sidebar_nav = sidebar_wrapper.find(' > .nav');

      nav_content = $(nav_content);
      navbar_form = $(navbar_form);
      nav_content.insertBefore(sidebar_nav);
      navbar_form.insertBefore(nav_content);

      $(".sidebar-wrapper .dropdown .dropdown-menu > li > a").click(function(event) {
          event.stopPropagation();
      });
      // simulate resize so all the charts/maps will be redrawn
      window.dispatchEvent(new Event('resize'));

      mobile_menu_initialized = true;
    }
  }

  public loadNotifications(){
    this.spinner.show();
    this.notificationService.getInboxNotification()
    .subscribe(
      (data:any)=>{
        $('#notificationsBar').empty();
        this.countNotifications = data.length
        for(let notification of data){
          var dateNotification = notification.updated_at.split("T");
          $('#notificationsBar').append(
          '<div style="overflow: auto;" class="dropdown-item">'
          +dateNotification[0]+' '+dateNotification[1].split(".")[0]+'<br>'
          +notification.title+'<br>'
          +'Emisor ID: '+notification.iduser_emisor+'<br>'
          +notification.description
          +'</div><hr>')
        }
        this.notifications = data;
        this.spinner.hide();
      },
      (err:any)=>{
        this.spinner.hide();
      }
    )
  }

  public updateNotifications(){
    this.loadNotifications()
  }

}
