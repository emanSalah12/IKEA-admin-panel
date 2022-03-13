import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { OrderDetailsComponent } from './pages/orders/order-details/order-details.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
      { path: 'Dashboard', component: DashboardComponent },
      { path: 'Orders', component: OrdersComponent },
      { path: 'OrderDetails/:oid', component: OrderDetailsComponent },
      {
        path: 'Products',
        loadChildren: () =>
          import('src/app/pages/products-module/products-module.module').then(
            (m) => m.ProductsModule
          ),
      },
      { path: 'Users', component: UsersComponent },
    ],
    canActivate: [AuthGuard],
  },
  { path: 'Login', component: LoginComponent },
  { path: 'ResetPassword', component: ResetPasswordComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
