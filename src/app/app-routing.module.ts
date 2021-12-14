import { AddressComponent } from './pages/address/address.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { AuthguardGuard } from './guard/auth.guard';
import { SigninComponent } from './pages/signin/signin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CartComponent } from './pages/cart/cart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductsComponent } from './pages/products/products.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { CategoryComponent } from './pages/admin/category/category.component';
import { ManageProductsComponent } from './pages/admin/manage-products/manage-products.component';
import { ManageOrdersComponent } from './pages/admin/manage-orders/manage-orders.component';
import { AddProductComponent } from './pages/admin/manage-products/add-product/add-product.component';
import { UpdateProductComponent } from './pages/admin/manage-products/update-product/update-product.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserUpdateComponent } from './pages/admin/users/user-update/user-update.component';
import { AdminGuard } from './guard/admin/admin.guard';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';


const routes: Routes = [
  // User Routes 
  {
    path: '',
    component: HomeComponent,
    
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'address',
    component: AddressComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'product/:id',
    component: ProductComponent,
  },
  {
    path: 'wishlists',
    component: WishlistComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'forgot-password/:id',
    component: ForgotPasswordComponent,
  },

  // Admin Routes
  {
    path: 'admin-dashboard',
    component: DashboardComponent,
    canActivate : [AdminGuard]
  },
  {
    path: 'admin-users',
    component: UsersComponent,
    canActivate : [AdminGuard]
  },
  {
    path: 'admin-users-update/:id',
    component: UserUpdateComponent,
    canActivate : [AdminGuard]
  },
  {
    path: 'admin-categories',
    component: CategoryComponent,
    canActivate : [AdminGuard]
  },
  {
    path: 'admin-products',
    component: ManageProductsComponent,
    canActivate : [AdminGuard]
  },
  {
    path: 'admin-products-add',
    component: AddProductComponent,
    canActivate : [AdminGuard]
  },
  {
    path: 'admin-products-update/:id',
    component: UpdateProductComponent,
    canActivate : [AdminGuard]
  },
  {
    path: 'admin-orders',
    component: ManageOrdersComponent,
    canActivate : [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
