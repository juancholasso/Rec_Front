import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// import { PricingComponent } from './pricing/pricing.component';
// import { LockComponent } from './lock/lock.component';
// import { LoginComponent } from './login/login.component';


const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  { 
    path: '',  redirectTo: 'login', pathMatch: 'full' 
  }  
];
@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
  })
export class AuthRoutingModule { }