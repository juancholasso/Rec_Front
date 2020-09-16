import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';

// import { PricingComponent } from './pricing/pricing.component';
// import { LockComponent } from './lock/lock.component';
// import { LoginComponent } from './login/login.component';


const authRoutes: Routes = [
  {
      path: 'home',
      loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      // component: HomeComponent
  }    
];
@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
  })
export class DashboardRoutingModule { }