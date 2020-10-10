import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { RoleGuardService as RoleGuard } from '../services/guards/role_guard.service';

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
        loadChildren: () => import('./components/type-product/type-product.module').then(m => m.TypeProductModule),
        canActivate: [RoleGuard], 
        data: { 
          expectedRole: 'admin'
        }
      },
      {
        path: 'provider',
        loadChildren: () => import('./components/provider/provider.module').then(m => m.ProviderModule),
        canActivate: [RoleGuard], 
        data: { 
          expectedRole: 'admin'
        }
      },
      {
        path: 'product',
        loadChildren: () => import('./components/product/product.module').then(m => m.ProductModule),
        canActivate: [RoleGuard], 
        data: { 
          expectedRole: 'admin'
        }
      },
      {
        path: 'recycle',
        loadChildren: () => import('./components/recycle/recycle.module').then(m => m.RecycleModule),
        canActivate: [RoleGuard], 
        data: { 
          expectedRole: 'cliente'
        }
      },
      {
        path: 'gatherer',
        loadChildren: () => import('./components/gatherer/gatherer.module').then(m => m.GathererModule),
        canActivate: [RoleGuard], 
        data: { 
          expectedRole: 'recolector'
        }
      },
      {
        path: 'notification',
        loadChildren: () => import('./components/notification/notification.module').then(m => m.NotificationModule)
      },
      {
        path: 'exchange',
        loadChildren: () => import('./components/exchange/exchange.module').then(m => m.ExchangeModule),
        canActivate: [RoleGuard], 
        data: { 
          expectedRole: 'cliente'
        }
      },
    ],
  },
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      {
        path: 'invoices',
        loadChildren: () => import('./components/admin/invoices/invoices.module').then(m => m.InvoicesModule),
        canActivate: [RoleGuard], 
        data: { 
          expectedRole: 'admin'
        }
      },
      {
        path: 'recolector',
        loadChildren: () => import('./components/admin/recolector/recolector.module').then(m => m.RecolectorModule),
        canActivate: [RoleGuard], 
        data: { 
          expectedRole: 'admin'
        }
      }
    ]
  }
];
@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
  })
export class DashboardRoutingModule { }