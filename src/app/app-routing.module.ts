import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductTableComponent } from './pages/product-table/product-table/product-table.component';
import { AddNewProductComponent } from './pages/add-new-product/add-new-product.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
      { path: 'Dashboard', component: DashboardComponent },
      { path: 'Orders', component: OrdersComponent },
      {path: 'Products', component:ProductTableComponent},
      {path: 'addNewProd', component: AddNewProductComponent},
      {
        path: 'Products',
        loadChildren: () =>
          import('src/app/pages/products-module/products-module.module').then(
            (m) => m.ProductsModule
          ),
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
