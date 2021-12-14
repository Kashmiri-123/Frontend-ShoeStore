import { Injectable } from '@angular/core';
import { API } from 'src/BackEndConnection/Api';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get(API + "/all-products");
  }

  getProductById(id:string): Observable<any>{
    return this.http.get(API + "/product/" + id);
  }

  addProduct(product:any): Observable<any> {
    let header = {'content-type': 'application/json'};
    let body = JSON.stringify(product);
    return this.http.post(API + "/add-product/", body, {'headers': header})
  }

  updateProduct(id:string, updatedProduct:any): Observable<any> {
    let header = {'content-type': 'application/json'};
    let body = JSON.stringify(updatedProduct);
    return this.http.put(API + "/product-update/" + id, body, {'headers': header})
  }

  removeProduct(id:string): Observable<any> {
    return this.http.delete(API + "/product-remove/" + id);
  }
}
