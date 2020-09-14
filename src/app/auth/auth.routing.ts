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
      //loadChildren: () => import('./login/login.component').then(m => m.LoginComponent)
      component: LoginComponent
  },
  {
    path: 'register',
    //loadChildren: () => import('./login/login.component').then(m => m.LoginComponent)
    component: RegisterComponent
  }
        // , {
        //     path: 'lock',
        //     component: LockComponent
        // }, {
        //     path: 'register',
        //     component: RegisterComponent
        // }, {
        //     path: 'pricing',
        //     component: PricingComponent
        // }
    
];
@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
  })
export class AuthRoutingModule { }