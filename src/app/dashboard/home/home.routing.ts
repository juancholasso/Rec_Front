import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';

// import { PricingComponent } from './pricing/pricing.component';
// import { LockComponent } from './lock/lock.component';
// import { LoginComponent } from './login/login.component';


const authRoutes: Routes = [
  {
      path: '',
      component: HomeComponent
  }    
];
@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
  })
export class HomeRoutingModule { }