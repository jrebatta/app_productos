import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CreateProductoComponent } from './create-producto/create-producto.component';
import { HomeProductComponent } from './home-product/home-product.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UpdateProductComponent } from './update-product/update-product.component';

export const routes: Routes = [
  {path: 'list', component: ProductListComponent},
  {path: 'create', component: CreateProductoComponent},
  {path: 'detalle/:codigo', component: ProductDetailsComponent},
  {path: 'update/:codigo', component: UpdateProductComponent},
  {path: 'home', component: HomeProductComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];
