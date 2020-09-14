import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  // { path: 'signup', component: RegisterComponent },
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: '**', component: HomeComponent , canActivate: [AuthGuard]},
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
