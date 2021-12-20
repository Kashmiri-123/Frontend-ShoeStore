import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { CartComponent } from './pages/cart/cart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { CategoryComponent } from './pages/admin/category/category.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { ManageProductsComponent } from './pages/admin/manage-products/manage-products.component';
import { ManageOrdersComponent } from './pages/admin/manage-orders/manage-orders.component';
import { AddProductComponent } from './pages/admin/manage-products/add-product/add-product.component';
import { UpdateProductComponent } from './pages/admin/manage-products/update-product/update-product.component';
import { UserUpdateComponent } from './pages/admin/users/user-update/user-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressComponent } from './pages/address/address.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

// Toaster
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    ProductComponent,
    CartComponent,
    ContactComponent,
    AboutUsComponent,
    SigninComponent,
    SignupComponent,
    ProfileComponent,
    WishlistComponent,
    OrdersComponent,
    DashboardComponent,
    CategoryComponent,
    UsersComponent,
    ManageProductsComponent,
    ManageOrdersComponent,
    AddProductComponent,
    UpdateProductComponent,
    UserUpdateComponent,
    AddressComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
