import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';

const authRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'typeproduct',
        loadChildren: () => import('./components/type-product/type-product.module').then(m => m.TypeProductModule)
      },
      {
        path: 'provider',
        loadChildren: () => import('./components/provider/provider.module').then(m => m.ProviderModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./components/product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'recycle',
        loadChildren: () => import('./components/recycle/recycle.module').then(m => m.RecycleModule)
      },
      {
        path: 'gatherer',
        loadChildren: () => import('./components/gatherer/gatherer.module').then(m => m.GathererModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('./components/notification/notification.module').then(m => m.NotificationModule)
      }
    ]
  }
];
@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
  })
export class DashboardRoutingModule { }