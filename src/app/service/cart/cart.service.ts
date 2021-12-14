import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/BackEndConnection/Api';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }


  addToCart = (product:any) : Observable<any> => {
    let header = {'content-type': 'application/json'};
    let body = JSON.stringify(product);
    return this.http.post(API + "/add-cart", body, {'headers': header})
  }


  getCartProductByUserId = (): Observable<any> => {
     let id = this.authService.isAuthenticated()?.user?.id;
     return this.http.get(API + "/all-cart/" + id);
  }

  removeProductFromCart = (cartProductId:string) => {
      return this.http.delete(API + "/cart-remove/" + cartProductId);
  }


  updateCartProduct = (cartProduct:any) => {
    let header = {'content-type': 'application/json'};
    let body = JSON.stringify(cartProduct);
    return this.http.put(API + "/cart-update/" + cartProduct.id, body, {'headers': header})
  }
}
