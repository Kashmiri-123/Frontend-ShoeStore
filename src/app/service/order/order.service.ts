import { Injectable } from '@angular/core';
import { API } from 'src/BackEndConnection/Api';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) { }

  getAllOrders(): Observable<any> {
    return this.http.get(API + "/all-orders");
  }

  updateProduct(id:string, order:any): Observable<any> {
    let header = {'content-type': 'application/json'};
    let body = JSON.stringify(order);
    return this.http.put(API + "/orders-update/" + id, body, {'headers': header})
  }

  getAllOrderByUserId = (): Observable<any> => {
    let userId = this.authService.isAuthenticated()?.user?.id;
    return this.http.get(API + "/orders/" + userId);
  }

  placeOrder = (order: any) => {
    let header = {'content-type': 'application/json'};
    let body = JSON.stringify(order);
    return this.http.post(`${API}/add-order`, body, {'headers': header})
  }
}
