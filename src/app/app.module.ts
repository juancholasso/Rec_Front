import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { SweetAlertService } from './services/template/sweetalert.service';
import { AuthGuardService } from './services/auth-guard.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { ReactiveFormsModule} from '@angular/forms';

// import { LoginComponent } from './auth/login/login.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxAudioPlayerModule,
    ReactiveFormsModule,
  ],
  providers: [
    ApiService,
    AuthGuardService,
    SweetAlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
