import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';

const authRoutes: Routes = [
  {
    path: 'home',
    component: LayoutComponent,
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'typeproduct',
    component: LayoutComponent,
    loadChildren: () => import('./components/type-product/type-product.module').then(m => m.TypeProductModule)
  },
  {
    path: 'provider',
    component: LayoutComponent,
    loadChildren: () => import('./components/provider/provider.module').then(m => m.ProviderModule)
  },
  {
    path: 'product',
    component: LayoutComponent,
    loadChildren: () => import('./components/product/product.module').then(m => m.ProductModule)
  }
];
@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
  })
export class DashboardRoutingModule { }